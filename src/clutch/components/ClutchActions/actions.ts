/* THIS FILE WAS AUTOGENERATED BY CLUTCH. DO NOT EDIT. */
import { createPost } from "@clutch-marketplace/clutch.wordpress/dist/actions/actions.js";
import { createPost as createPost1 } from "@clutch-marketplace/clutch.wordpress/dist/actions/posts.js";
import { REST } from "@clutch-marketplace/clutch.rest/dist/actions/REST.js";
import { GraphQL } from "@clutch-marketplace/clutch.graphql/dist/actions/GraphQL.js";
import { navigate, goBack, goForward, refresh, replace } from "@clutch-marketplace/clutch.actions/dist/actions/navigation.js";
import { sendGoogleTagManagerEvent, sendGoogleAnalyticsEvent } from "@clutch-marketplace/clutch.google-analytics/dist/actions/google.js";
export const actions = {
    "LOCAL": {},
    "@clutch-marketplace/clutch.rest": {
        "/dist/actions/REST.ts": {
            "REST": REST
        }
    },
    "@clutch-marketplace/clutch.wordpress": {
        "/dist/actions/actions.ts": {
            "createPost": createPost
        },
        "/dist/actions/posts.ts": {
            "createPost": createPost1
        }
    },
    "@clutch-marketplace/clutch.actions": {
        "/dist/actions/navigation.ts": {
            "navigate": navigate,
            "goBack": goBack,
            "goForward": goForward,
            "refresh": refresh,
            "replace": replace
        }
    },
    "@clutch-marketplace/clutch.graphql": {
        "/dist/actions/GraphQL.ts": {
            "GraphQL": GraphQL
        }
    },
    "@clutch-marketplace/clutch.google-analytics": {
        "/dist/actions/google.ts": {
            "sendGoogleTagManagerEvent": sendGoogleTagManagerEvent,
            "sendGoogleAnalyticsEvent": sendGoogleAnalyticsEvent
        }
    }
};
