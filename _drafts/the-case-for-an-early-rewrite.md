---
layout: post
title: The Case for an Early Rewrite
category: [MGMT, War Stories]
---

I've started listening to [Maintainable](https://maintainable.fm/) and one of the Robby's standard questions is, "Are you on [Team Refactor](https://maintainable.fm/episodes/patricia-aas-intersection-of-programming-security?t=22m30s) or Team Rewrite?"


I'm on team refactor. Often, the best way to achieve a rewrite is through incremental refators.



# Rails Conf

## Outline

- Intro

  - Who are we?
  - Who am I?

- How did we get here?

  - What was Parse.com?
  - Why did we use it?
  - Why didn't we stick with it?
  - A Tiny Primer on Mongo vs PostgreSQL
  - When did it shut down? January 2017

- The Project Plan: How are we going to do this?

  - Getting Executive Buy-In - Nothing motivates like the threat of your database being deleted.

  - Don't change client code, build an admin tool to replace Parse.com dashboard

  - Project Idol: Write routes in rails that quack-like their Parse equivalents, with all the warts intact

  - Project Shadow: Replicate our parse dataset into a mongo database and run open-source parse on it.

## Start the Clock - 150 days until shutdown, 108 Days Until golive

  - Day 0 => `rails new`
  - Day 10 => ParseDrive; Build rails wrappers around Parse APIs and start to dump data
  - Day 17 => ParseModel; mixin w/ attribute normalizers for ActiveModel<->JSON
  - Day 20 => Generate ActiveModels and first migration from Mongo schema
  - Day 21 => ParselikeApiController, begin to write Cloud-Code function drop-ins
  - Day 22 => Bad day. Realized that parse only supports the HTTP verb Post.
  - Day 27 => Can freely convert parseId to postgres UUIDs and back again
  - Day 40 => 18 routes down, rake db:parse:import can import our entire production database to a local postgres
  - Day 60 => 35 routes down, ParseDrive Exports outgrew google drive, move to s3 upload
  - Day 61 => 36 routes down, Moved from an integer timezone offset to time zone name for ActiveSupport
  - Day 69 => QuantumLeap - A framework to allow to fake Time.current at the rails session level.
  - Day 71 => Figured out how to deploy a monorepo with 3 apps and 2 engines to Heroku
  - Day 75 => Moved the "parse-like" API routes to an engine, `rails new` on our Admin tool
  - Day 81 => 50 routes down! 95.5% code coverage
  - Day 94 => Shim parse session token mechanism to avoid breaking mobile clients in the field
  - Day 107 => Wait, who has our SSL signing key? I thought you did!
  - Day 108 => Golive.

- Where are we now?

  - Still a monorepo and loving it.
  - Client cleanup, removing the ParseSDK
  - /api/v*/ routes now outnumber parselike /1/functions/*

- Moral of the story?

  - Do whatever you need to do to get your company off the ground. Preferably, use rails. But even if you don't start there, you can get there.

- Questions?

### Pitch

- Getting to market is the most important. We'll always respect Parse.com for getting us through those first 9 months.
- We did it. When I joined the team in Aug 2016, I was somewhat skeptical that we'd be able to accomplish a full-data and backend migration before the shutdown. But, with some ingenuity and beautifully dirty hacks, we were able to build routes that pretended to be parse.com and complete a seamless switchover without breaking clients in the field.
- Moving to Rails has enabled our business to thrive. We've more than doubled the size of our user-base since moving off of Parse.com, with a peak load of 500 requests per second, serving users in 5 countries, across 3 continents. I can't tell you how much I love ActiveSupport::TimeZone.
- We deploy a rails monorepo (with 3 apps and 2 engines) to Heroku. It's a "macro-service" philosophy that's incredibly practical and just works. We've open source some example repos that demonstrate use of the buildpack that I'm happy to provide links to.
- NoSQL makes transactional systems that require atomicity really hard -- We developed a strategy for bi-directionally mapping records from mongo to postgresql so we could ensure we didn't lose any data during the transition.
- Rails make some things that were really hard in Parse no-brainers. "We should have singular (not plural) table names in the new database." No. We're doing it the Rails way.