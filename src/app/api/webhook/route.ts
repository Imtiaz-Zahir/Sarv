import { updateLink } from "@/services/link";
import {
  Environment,
  EventName,
  Paddle,
  SubscriptionActivatedEvent,
  SubscriptionCanceledEvent,
  SubscriptionCreatedEvent,
  SubscriptionImportedEvent,
  SubscriptionPastDueEvent,
  SubscriptionPausedEvent,
  SubscriptionResumedEvent,
  SubscriptionTrialingEvent,
  SubscriptionUpdatedEvent,
} from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";

const paddleApiKey = process.env.PADDLE_API_KEY;
if (!paddleApiKey) {
  throw new Error("Missing PADDLE_API_KEY environment variable");
}

const paddleEnvironment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT;
if (!paddleEnvironment) {
  throw new Error(
    "Missing NEXT_PUBLIC_PADDLE_ENVIRONMENT environment variable"
  );
}

const paddle = new Paddle(paddleApiKey, {
  environment:
    paddleEnvironment === "production"
      ? Environment.production
      : Environment.sandbox,
});

type SubscriptionEvents =
  | SubscriptionActivatedEvent
  | SubscriptionCreatedEvent
  | SubscriptionCanceledEvent
  | SubscriptionUpdatedEvent
  | SubscriptionPastDueEvent
  | SubscriptionPausedEvent
  | SubscriptionResumedEvent
  | SubscriptionTrialingEvent
  | SubscriptionImportedEvent;

async function handelWebhookEvent(eventData: SubscriptionEvents) {
  if (!eventData.data.customData) {
    return NextResponse.json(
      { error: "Custom Data not found" },
      { status: 400 }
    );
  }

  if (
    typeof eventData.data.customData !== "object" ||
    !("linkId" in eventData.data.customData) ||
    typeof eventData.data.customData.linkId !== "string"
  ) {
    return NextResponse.json(
      {
        error: "linkId not found",
      },
      { status: 400 }
    );
  }

  const linkId = eventData.data.customData?.linkId;

  await updateLink(linkId, {
    subscriptionEndAt: eventData.data.currentBillingPeriod?.endsAt
      ? new Date(eventData.data.currentBillingPeriod?.endsAt)
      : null,
    subscriptionStatus: eventData.data.status,
  });
}

const subscriptionEvents = [
  EventName.SubscriptionActivated,
  EventName.SubscriptionCanceled,
  EventName.SubscriptionCreated,
  EventName.SubscriptionImported,
  EventName.SubscriptionPastDue,
  EventName.SubscriptionPaused,
  EventName.SubscriptionResumed,
  EventName.SubscriptionTrialing,
  EventName.SubscriptionUpdated,
];

export async function POST(req: Request) {
  const signature = req.headers.get("paddle-signature") || "";
  if (!signature) {
    return NextResponse.json({ error: "Signature missing" }, { status: 400 });
  }

  const rawRequestBody = (await req.text()) || "";
  if (!rawRequestBody) {
    return NextResponse.json(
      { error: "Raw request body missing" },
      { status: 400 }
    );
  }

  try {
    const webhookSecretKey = process.env.PADDLE_WEBHOOK_SECRET_KEY;
    if (!webhookSecretKey) {
      throw new Error("Missing PADDLE_WEBHOOK_SECRET_KEY environment variable");
    }

    const eventData = await paddle.webhooks.unmarshal(
      rawRequestBody,
      webhookSecretKey,
      signature
    );

    if (!eventData) {
      return NextResponse.json(
        { error: "Event data missing" },
        { status: 400 }
      );
    }

    if (subscriptionEvents.includes(eventData.eventType)) {
      if (subscriptionEvents.includes(eventData.eventType)) {
        await handelWebhookEvent(eventData as SubscriptionEvents);
      }
    } else {
      throw new Error(
        "Unhandled webhook request type : " + eventData.eventType
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unhandled Error" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
