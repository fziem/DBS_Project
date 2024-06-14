--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authorOfBook; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."authorOfBook" (
    "ID" integer NOT NULL,
    "ISBN" bigint NOT NULL,
    "AuthorID" integer NOT NULL,
    "AuthorPrio" smallint NOT NULL
);


ALTER TABLE public."authorOfBook" OWNER TO postgres;

--
-- Name: authorOfBook_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."authorOfBook_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."authorOfBook_ID_seq" OWNER TO postgres;

--
-- Name: authorOfBook_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."authorOfBook_ID_seq" OWNED BY public."authorOfBook"."ID";


--
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    "AuthorID" integer NOT NULL,
    "FirstName" character varying(20) NOT NULL,
    "LastName" character varying(20) NOT NULL
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- Name: authors_AuthorID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."authors_AuthorID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."authors_AuthorID_seq" OWNER TO postgres;

--
-- Name: authors_AuthorID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."authors_AuthorID_seq" OWNED BY public.authors."AuthorID";


--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    "BookID" integer NOT NULL,
    "ISBN" bigint NOT NULL,
    "Title" text NOT NULL,
    "PublisherID" integer NOT NULL,
    "Year" smallint NOT NULL,
    "isEnabled" boolean NOT NULL
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_BookID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."books_BookID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."books_BookID_seq" OWNER TO postgres;

--
-- Name: books_BookID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."books_BookID_seq" OWNED BY public.books."BookID";


--
-- Name: borrows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.borrows (
    "BorrowID" integer NOT NULL,
    "BookID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "BorrowDate" date NOT NULL,
    "BorrowTime" smallint NOT NULL,
    "ReturnDate" date NOT NULL,
    "FinePaid" boolean NOT NULL
);


ALTER TABLE public.borrows OWNER TO postgres;

--
-- Name: borrows_BorrowID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."borrows_BorrowID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."borrows_BorrowID_seq" OWNER TO postgres;

--
-- Name: borrows_BorrowID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."borrows_BorrowID_seq" OWNED BY public.borrows."BorrowID";


--
-- Name: holdbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.holdbacks (
    "HoldBackID" integer NOT NULL,
    "BookID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "HoldBackDate" date NOT NULL,
    "HoldBackTime" smallint NOT NULL,
    "IsPickedUp" boolean NOT NULL,
    "BorrowID" integer
);


ALTER TABLE public.holdbacks OWNER TO postgres;

--
-- Name: holdbacks_HoldBackID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."holdbacks_HoldBackID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."holdbacks_HoldBackID_seq" OWNER TO postgres;

--
-- Name: holdbacks_HoldBackID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."holdbacks_HoldBackID_seq" OWNED BY public.holdbacks."HoldBackID";


--
-- Name: keywordOfBook; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."keywordOfBook" (
    "ID" integer NOT NULL,
    "ISBN" bigint NOT NULL,
    "KeywordID" integer NOT NULL
);


ALTER TABLE public."keywordOfBook" OWNER TO postgres;

--
-- Name: keywordOfBook_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."keywordOfBook_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."keywordOfBook_ID_seq" OWNER TO postgres;

--
-- Name: keywordOfBook_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."keywordOfBook_ID_seq" OWNED BY public."keywordOfBook"."ID";


--
-- Name: keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.keywords (
    "KeywordID" integer NOT NULL,
    "KeywordName" character varying(20) NOT NULL,
    "KeywordDesc" text NOT NULL
);


ALTER TABLE public.keywords OWNER TO postgres;

--
-- Name: keywords_KeywordID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."keywords_KeywordID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."keywords_KeywordID_seq" OWNER TO postgres;

--
-- Name: keywords_KeywordID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."keywords_KeywordID_seq" OWNED BY public.keywords."KeywordID";


--
-- Name: publishers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publishers (
    "PublisherID" integer NOT NULL,
    "PublisherName" character varying(32) NOT NULL
);


ALTER TABLE public.publishers OWNER TO postgres;

--
-- Name: publishers_PublisherID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."publishers_PublisherID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."publishers_PublisherID_seq" OWNER TO postgres;

--
-- Name: publishers_PublisherID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."publishers_PublisherID_seq" OWNED BY public.publishers."PublisherID";


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    "UserID" integer NOT NULL,
    "GroupID" integer NOT NULL,
    "Email" character varying(32) NOT NULL,
    "Pass" character varying(64) NOT NULL,
    "FirstName" character varying(20) NOT NULL,
    "LastName" character varying(20) NOT NULL,
    "Phone" bigint NOT NULL,
    "STR" character varying(20) NOT NULL,
    "PLZ" character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_UserID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users_UserID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."users_UserID_seq" OWNER TO postgres;

--
-- Name: users_UserID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users_UserID_seq" OWNED BY public.users."UserID";


--
-- Name: authorOfBook ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."authorOfBook" ALTER COLUMN "ID" SET DEFAULT nextval('public."authorOfBook_ID_seq"'::regclass);


--
-- Name: authors AuthorID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN "AuthorID" SET DEFAULT nextval('public."authors_AuthorID_seq"'::regclass);


--
-- Name: books BookID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN "BookID" SET DEFAULT nextval('public."books_BookID_seq"'::regclass);


--
-- Name: borrows BorrowID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrows ALTER COLUMN "BorrowID" SET DEFAULT nextval('public."borrows_BorrowID_seq"'::regclass);


--
-- Name: holdbacks HoldBackID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holdbacks ALTER COLUMN "HoldBackID" SET DEFAULT nextval('public."holdbacks_HoldBackID_seq"'::regclass);


--
-- Name: keywordOfBook ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."keywordOfBook" ALTER COLUMN "ID" SET DEFAULT nextval('public."keywordOfBook_ID_seq"'::regclass);


--
-- Name: keywords KeywordID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keywords ALTER COLUMN "KeywordID" SET DEFAULT nextval('public."keywords_KeywordID_seq"'::regclass);


--
-- Name: publishers PublisherID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers ALTER COLUMN "PublisherID" SET DEFAULT nextval('public."publishers_PublisherID_seq"'::regclass);


--
-- Name: users UserID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN "UserID" SET DEFAULT nextval('public."users_UserID_seq"'::regclass);


--
-- Data for Name: authorOfBook; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."authorOfBook" ("ID", "ISBN", "AuthorID", "AuthorPrio") FROM stdin;
1	0	1	1
\.


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authors ("AuthorID", "FirstName", "LastName") FROM stdin;
1	Ronald	McDonald
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books ("BookID", "ISBN", "Title", "PublisherID", "Year", "isEnabled") FROM stdin;
0	0	testing	0	0	t
\.


--
-- Data for Name: borrows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.borrows ("BorrowID", "BookID", "UserID", "BorrowDate", "BorrowTime", "ReturnDate", "FinePaid") FROM stdin;
2	0	1	2024-02-21	7	1970-01-01	f
\.


--
-- Data for Name: holdbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.holdbacks ("HoldBackID", "BookID", "UserID", "HoldBackDate", "HoldBackTime", "IsPickedUp", "BorrowID") FROM stdin;
0	0	1	2024-02-21	7	t	\N
\.


--
-- Data for Name: keywordOfBook; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."keywordOfBook" ("ID", "ISBN", "KeywordID") FROM stdin;
1	0	1
\.


--
-- Data for Name: keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.keywords ("KeywordID", "KeywordName", "KeywordDesc") FROM stdin;
1	Roman	Roman
\.


--
-- Data for Name: publishers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publishers ("PublisherID", "PublisherName") FROM stdin;
0	testing
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users ("UserID", "GroupID", "Email", "Pass", "FirstName", "LastName", "Phone", "STR", "PLZ") FROM stdin;
5	1	affe	$2y$10$AI8ga4OcfHHNkrdA5P1eBu2ZpVMBgDtsGMzPbSIGviVMIoZl3gWqO	affe	affe	1234	affe	affe
4	1	User@mail.com	$2y$10$/pEMIi3ozHlRJ.hfWs/fhuNpl5z1lta2Vjc8GxFU4kG4l1jUxnXfK	Jimmy	James	1234567890	James	James
1	0	banned	banned	banned	banned	1234	banned	banned

\.


--
-- Name: authorOfBook_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."authorOfBook_ID_seq"', 1, true);


--
-- Name: authors_AuthorID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."authors_AuthorID_seq"', 1, true);


--
-- Name: books_BookID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."books_BookID_seq"', 1, true);


--
-- Name: borrows_BorrowID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."borrows_BorrowID_seq"', 2, true);


--
-- Name: holdbacks_HoldBackID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."holdbacks_HoldBackID_seq"', 1, false);


--
-- Name: keywordOfBook_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."keywordOfBook_ID_seq"', 1, true);


--
-- Name: keywords_KeywordID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."keywords_KeywordID_seq"', 1, true);


--
-- Name: publishers_PublisherID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."publishers_PublisherID_seq"', 1, false);


--
-- Name: users_UserID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users_UserID_seq"', 6, true);


--
-- Name: authorOfBook authorOfBook_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."authorOfBook"
    ADD CONSTRAINT "authorOfBook_pkey" PRIMARY KEY ("ID");


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY ("AuthorID");


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY ("BookID");


--
-- Name: borrows borrows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrows
    ADD CONSTRAINT borrows_pkey PRIMARY KEY ("BorrowID");


--
-- Name: holdbacks holdbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holdbacks
    ADD CONSTRAINT holdbacks_pkey PRIMARY KEY ("HoldBackID");


--
-- Name: keywordOfBook keywordOfBook_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."keywordOfBook"
    ADD CONSTRAINT "keywordOfBook_pkey" PRIMARY KEY ("ID");


--
-- Name: keywords keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keywords
    ADD CONSTRAINT keywords_pkey PRIMARY KEY ("KeywordID");


--
-- Name: publishers publishers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY ("PublisherID");


--
-- Name: users user_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email_unique UNIQUE ("Email");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("UserID");


--
-- Name: authorOfBook authorOfBook_AuthorID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."authorOfBook"
    ADD CONSTRAINT "authorOfBook_AuthorID_fkey" FOREIGN KEY ("AuthorID") REFERENCES public.authors("AuthorID") ON DELETE RESTRICT;


--
-- Name: books books_PublisherID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT "books_PublisherID_fkey" FOREIGN KEY ("PublisherID") REFERENCES public.publishers("PublisherID") ON DELETE RESTRICT;


--
-- Name: borrows borrows_BookID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrows
    ADD CONSTRAINT "borrows_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES public.books("BookID") ON DELETE RESTRICT;


--
-- Name: borrows borrows_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrows
    ADD CONSTRAINT "borrows_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public.users("UserID") ON DELETE RESTRICT;


--
-- Name: holdbacks holdbacks_BookID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holdbacks
    ADD CONSTRAINT "holdbacks_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES public.books("BookID") ON DELETE RESTRICT;


--
-- Name: holdbacks holdbacks_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holdbacks
    ADD CONSTRAINT "holdbacks_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public.users("UserID") ON DELETE RESTRICT;


--
-- Name: keywordOfBook keywordOfBook_KeywordID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."keywordOfBook"
    ADD CONSTRAINT "keywordOfBook_KeywordID_fkey" FOREIGN KEY ("KeywordID") REFERENCES public.keywords("KeywordID") ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

