CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
WITH
    SCHEMA public;

CREATE TABLE
    public.comments (
        id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
        user_id uuid NOT NULL,
        post_id uuid NOT NULL,
        text text NOT NULL,
        created_at timestamp without time zone DEFAULT now () NOT NULL
    );

CREATE TABLE
    public.following (
        id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
        follower uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
        followed uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
        created_at timestamp without time zone DEFAULT now () NOT NULL
    );

CREATE TABLE
    public.likes (
        id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
        user_id uuid NOT NULL,
        post_id uuid NOT NULL,
        created_at timestamp without time zone DEFAULT now () NOT NULL
    );

CREATE TABLE
    public.posts (
        id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
        photo text NOT NULL,
        description text NOT NULL,
        user_id uuid NOT NULL,
        created_at timestamp without time zone DEFAULT now () NOT NULL
    );

CREATE TABLE
    public.sessions (
        id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
        user_id uuid NOT NULL,
        created_at timestamp without time zone DEFAULT now () NOT NULL,
        ip text NOT NULL
    );

CREATE TABLE
    public.users (
        id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
        name text NOT NULL,
        email text NOT NULL,
        photo text,
        bio character varying(200),
        password text NOT NULL,
        created_at timestamp without time zone DEFAULT now () NOT NULL
    );

ALTER TABLE ONLY public.comments ADD CONSTRAINT comments_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.following ADD CONSTRAINT followed_follower_unique UNIQUE (follower, followed);

ALTER TABLE public.following ADD CONSTRAINT following_check CHECK ((follower <> followed)) NOT VALID;

ALTER TABLE ONLY public.following ADD CONSTRAINT following_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.likes ADD CONSTRAINT likes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.posts ADD CONSTRAINT posts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sessions ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.comments ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts (id) NOT VALID;

ALTER TABLE ONLY public.comments ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) NOT VALID;

ALTER TABLE ONLY public.following ADD CONSTRAINT following_followed_fkey FOREIGN KEY (followed) REFERENCES public.users (id) NOT VALID;

ALTER TABLE ONLY public.following ADD CONSTRAINT following_follower_fkey FOREIGN KEY (follower) REFERENCES public.users (id) NOT VALID;

ALTER TABLE ONLY public.likes ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts (id) NOT VALID;

ALTER TABLE ONLY public.likes ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) NOT VALID;

ALTER TABLE ONLY public.posts ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) NOT VALID;

ALTER TABLE ONLY public.sessions ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) NOT VALID;