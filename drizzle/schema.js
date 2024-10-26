import { pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const leadLists = pgTable('lead_lists', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull(),
  name: text('name'),
  listId: serial('list_id').references(() => leadLists.id),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  fields: text('fields').notNull(), // JSON stringified array of field definitions
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const formResponses = pgTable('form_responses', {
  id: serial('id').primaryKey(),
  formId: serial('form_id').references(() => forms.id),
  responses: text('responses').notNull(), // JSON stringified responses
  createdAt: timestamp('created_at').defaultNow(),
});

export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  comments: text('comments').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});