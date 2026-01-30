CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"category" varchar(50) NOT NULL,
	"image" varchar(255) NOT NULL,
	"date" varchar(50) NOT NULL,
	"author" varchar(100) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"seo_title" varchar(255),
	"seo_description" text,
	"seo_keywords" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "evaluations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"parent_name" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"age" varchar(50),
	"location" jsonb,
	"breathing_signs" jsonb,
	"dental_issues" jsonb,
	"oral_habits" jsonb,
	"posture" varchar(100),
	"speech_issues" varchar(100),
	"sleep_quality" varchar(100),
	"previous_treatment" varchar(100),
	"risk_level" varchar(20),
	"analysis_result" jsonb,
	"recommended_specialist_id" integer,
	"utm_source" varchar(100),
	"utm_medium" varchar(100),
	"utm_campaign" varchar(100),
	"utm_content" varchar(100),
	"utm_term" varchar(100),
	"tracking_event_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" text NOT NULL,
	"description" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "specialists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"region" varchar(50),
	"city" varchar(100) NOT NULL,
	"address" text NOT NULL,
	"phone" varchar(20) NOT NULL,
	"whatsapp" varchar(20),
	"email" varchar(255) NOT NULL,
	"lat" numeric(10, 7) NOT NULL,
	"lng" numeric(10, 7) NOT NULL,
	"image" varchar(20),
	"seed" integer,
	"custom_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"text" text NOT NULL,
	"role" varchar(255) NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"avatar_gender" varchar(10) DEFAULT 'female',
	"avatar_seed" integer DEFAULT 0,
	"custom_avatar" text,
	"featured" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tracking_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_name" varchar(100) NOT NULL,
	"event_id" varchar(255),
	"user_fingerprint" varchar(255),
	"fbp" varchar(255),
	"fbc" varchar(255),
	"utm_source" varchar(100),
	"utm_medium" varchar(100),
	"utm_campaign" varchar(100),
	"utm_content" varchar(100),
	"utm_term" varchar(100),
	"ip_address" varchar(45),
	"user_agent" text,
	"referrer" text,
	"event_data" jsonb,
	"evaluation_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tracking_events_event_id_unique" UNIQUE("event_id")
);
--> statement-breakpoint
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_recommended_specialist_id_specialists_id_fk" FOREIGN KEY ("recommended_specialist_id") REFERENCES "public"."specialists"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_events" ADD CONSTRAINT "tracking_events_evaluation_id_evaluations_id_fk" FOREIGN KEY ("evaluation_id") REFERENCES "public"."evaluations"("id") ON DELETE set null ON UPDATE no action;