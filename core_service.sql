--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: SemesterRegistrationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SemesterRegistrationStatus" AS ENUM (
    'UPCOMING',
    'ONGOING',
    'ENDED'
);


ALTER TYPE public."SemesterRegistrationStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: academic_depertment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.academic_depertment (
    id text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "academicFacultyId" text NOT NULL
);


ALTER TABLE public.academic_depertment OWNER TO postgres;

--
-- Name: academic_faculty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.academic_faculty (
    id text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.academic_faculty OWNER TO postgres;

--
-- Name: academic_semester; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.academic_semester (
    id text NOT NULL,
    year integer NOT NULL,
    title text NOT NULL,
    code text NOT NULL,
    "startMonth" text NOT NULL,
    "endMonth" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.academic_semester OWNER TO postgres;

--
-- Name: buildings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buildings (
    id text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.buildings OWNER TO postgres;

--
-- Name: courseToPrerequisites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."courseToPrerequisites" (
    "courseId" text NOT NULL,
    "preRequisiteId" text NOT NULL
);


ALTER TABLE public."courseToPrerequisites" OWNER TO postgres;

--
-- Name: course_faculties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_faculties (
    "courseId" text NOT NULL,
    "facultyId" text NOT NULL
);


ALTER TABLE public.course_faculties OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id text NOT NULL,
    title text NOT NULL,
    code text NOT NULL,
    credits integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: faculties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculties (
    id text NOT NULL,
    "facultyId" text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "middleName" text NOT NULL,
    "profileImage" text NOT NULL,
    email text NOT NULL,
    "contactNo" text NOT NULL,
    gender text NOT NULL,
    "bloodGroup" text NOT NULL,
    designation text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "academicDepartmentId" text NOT NULL,
    "academicFacultyId" text NOT NULL
);


ALTER TABLE public.faculties OWNER TO postgres;

--
-- Name: offered_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offered_courses (
    id text NOT NULL,
    "courseId" text NOT NULL,
    "academicDepartmentId" text NOT NULL,
    "semesterRegistrationId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.offered_courses OWNER TO postgres;

--
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    id text NOT NULL,
    "roomNumber" text NOT NULL,
    floor text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "buildingId" text NOT NULL
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- Name: semester_registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.semester_registrations (
    id text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    status public."SemesterRegistrationStatus" DEFAULT 'UPCOMING'::public."SemesterRegistrationStatus",
    "minCredit" integer DEFAULT 0 NOT NULL,
    "maxCredit" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "academicSemesterId" text NOT NULL
);


ALTER TABLE public.semester_registrations OWNER TO postgres;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id text NOT NULL,
    "studentId" text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "middleName" text NOT NULL,
    "profileImage" text NOT NULL,
    email text NOT NULL,
    "contactNo" text NOT NULL,
    gender text NOT NULL,
    "bloodGroup" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "academicSemesterId" text NOT NULL,
    "academicFacultyId" text NOT NULL,
    "academicDepartmentId" text NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
fa614718-2c1f-48a6-ac27-e52ec85e5fb7	13ff8b4c204f898d51eabe31f72810e170084911c05800a44239d119fd2b4860	2023-09-05 22:37:57.251378+06	20230827043926_init	\N	\N	2023-09-05 22:37:57.231463+06	1
0566d42e-279d-4869-b1c5-0646da1095be	161909d2e74b5dce2ef8d6917b594369550fdfc1dda97e61b738c9f8ae56cd17	2023-09-05 22:37:57.255025+06	20230827045527_name_change	\N	\N	2023-09-05 22:37:57.252019+06	1
4b5ae486-56bc-4ed2-a1e3-05056e9bc045	faf7cc047cacc25d7babfa1283dc88d221dadb8e22c6b6440d3489daed692958	2023-09-05 22:37:57.263839+06	20230827154327_building_room_table	\N	\N	2023-09-05 22:37:57.255628+06	1
4ba2189f-f792-4d5f-ab6f-c7e47a9b09f0	025c5cbacde69a7e4719740a7de0024fcf3bf37782f6e98a925cd0978d0fe5bc	2023-09-05 22:37:57.273134+06	20230828153221_course_and_course_to_prerequisite_generate	\N	\N	2023-09-05 22:37:57.264377+06	1
d3cb30de-fc7a-4279-b63d-8d88d2e8eb1d	bee095accd7e2ab6df8fedd24a0c3d94fed6d0ab97fd37492b59b09609cc9e19	2023-09-05 22:37:57.28037+06	20230828153355_course_to_prerequisites	\N	\N	2023-09-05 22:37:57.273665+06	1
7dfa0950-7c66-4934-bf96-52eb52c39e63	5ff3dc17057ede7c6f13770642303b7cfa2a4b7343ce65868c7f7e7fb00c2fee	2023-09-05 22:37:57.286457+06	20230903153006_course_and_faculty_relation	\N	\N	2023-09-05 22:37:57.280966+06	1
92adb9f9-581a-483e-bd7a-5580a6a59785	2599a52d922852498fdbe0b812580b71d5cbc0588a615eea67f6dafdf4455062	2023-09-05 22:37:58.044019+06	20230905163758_semester_registration	\N	\N	2023-09-05 22:37:58.03749+06	1
abb79dc5-190b-47fe-ae4a-389983dafea1	6615b1c8f71102063cca87c82d2eb112f5fb89b0ffc47558ae4b5b331d54c2d6	2023-09-08 21:30:13.834858+06	20230908153013_offered	\N	\N	2023-09-08 21:30:13.815012+06	1
\.


--
-- Data for Name: academic_depertment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.academic_depertment (id, title, "createdAt", "updatedAt", "academicFacultyId") FROM stdin;
a490f285-e8b3-4e2d-9002-55824a9c0025	EEE department	2023-09-05 16:42:16.343	2023-09-05 16:42:16.343	885dd24c-146b-46d3-b8ce-917397862c11
fae8c6e5-31cc-4eec-803e-28e3c39bc074	CSE department	2023-09-05 16:42:39.506	2023-09-05 16:42:39.506	8ecb6198-111d-4cb8-bdda-7872268db08a
\.


--
-- Data for Name: academic_faculty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.academic_faculty (id, title, "createdAt", "updatedAt") FROM stdin;
8ecb6198-111d-4cb8-bdda-7872268db08a	CSE faculty	2023-09-05 16:41:54.255	2023-09-05 16:41:54.255
885dd24c-146b-46d3-b8ce-917397862c11	EEE faculty	2023-09-05 16:41:57.458	2023-09-05 16:41:57.458
\.


--
-- Data for Name: academic_semester; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.academic_semester (id, year, title, code, "startMonth", "endMonth", "createdAt", "updatedAt") FROM stdin;
36e376f3-8bf9-44a9-9523-cf2ca20035c7	2023	Autham	01	January	June	2023-09-05 16:41:26.301	2023-09-05 16:41:26.301
8c1d54c7-6188-4c19-aa84-259fec8213a4	2023	Fall	03	January	June	2023-09-05 16:41:41.826	2023-09-05 16:41:41.826
\.


--
-- Data for Name: buildings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buildings (id, title, "createdAt", "updatedAt") FROM stdin;
1372868e-9ba2-4685-a38a-88d34c301f7e	Building-A1	2023-09-05 16:45:15.049	2023-09-05 16:45:15.049
\.


--
-- Data for Name: courseToPrerequisites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."courseToPrerequisites" ("courseId", "preRequisiteId") FROM stdin;
6a9940bb-b541-4dd6-a454-46c14ce196bf	caaf55b8-cff4-4f4b-9000-4edd9b735f10
1f765a70-72b6-4ca5-be07-b24eb1cd8b1c	caaf55b8-cff4-4f4b-9000-4edd9b735f10
1f765a70-72b6-4ca5-be07-b24eb1cd8b1c	6a9940bb-b541-4dd6-a454-46c14ce196bf
\.


--
-- Data for Name: course_faculties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_faculties ("courseId", "facultyId") FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, title, code, credits, "createdAt", "updatedAt") FROM stdin;
caaf55b8-cff4-4f4b-9000-4edd9b735f10	Data Structure	01	3	2023-09-05 16:46:18.227	2023-09-05 16:46:18.227
6a9940bb-b541-4dd6-a454-46c14ce196bf	Data Structure-2	02	3	2023-09-05 16:46:41.992	2023-09-05 16:46:41.992
1f765a70-72b6-4ca5-be07-b24eb1cd8b1c	Data Structure-3	02	3	2023-09-05 16:47:15.295	2023-09-05 16:47:15.295
\.


--
-- Data for Name: faculties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculties (id, "facultyId", "firstName", "lastName", "middleName", "profileImage", email, "contactNo", gender, "bloodGroup", designation, "createdAt", "updatedAt", "academicDepartmentId", "academicFacultyId") FROM stdin;
34898b08-4c1f-45dd-ac44-62e0b436a606	F-00001	asad10	santo10		image link	asad30@gmail.com	016000000002	male	B+	Lecturer	2023-09-05 16:43:35.637	2023-09-05 16:43:35.637	fae8c6e5-31cc-4eec-803e-28e3c39bc074	8ecb6198-111d-4cb8-bdda-7872268db08a
\.


--
-- Data for Name: offered_courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offered_courses (id, "courseId", "academicDepartmentId", "semesterRegistrationId", "createdAt", "updatedAt") FROM stdin;
1bc71112-66c5-4c71-b401-c00650420b2e	caaf55b8-cff4-4f4b-9000-4edd9b735f10	fae8c6e5-31cc-4eec-803e-28e3c39bc074	ac3887de-c13f-4f81-9e24-b441bc0f6c1c	2023-09-09 14:01:09.783	2023-09-09 14:01:09.783
38365829-cfc3-4020-9ade-867c6393d60f	6a9940bb-b541-4dd6-a454-46c14ce196bf	fae8c6e5-31cc-4eec-803e-28e3c39bc074	ac3887de-c13f-4f81-9e24-b441bc0f6c1c	2023-09-09 14:01:09.791	2023-09-09 14:01:09.791
52124834-4bb8-4da8-af2e-6f0ee37872da	1f765a70-72b6-4ca5-be07-b24eb1cd8b1c	fae8c6e5-31cc-4eec-803e-28e3c39bc074	ac3887de-c13f-4f81-9e24-b441bc0f6c1c	2023-09-09 14:04:46.351	2023-09-09 14:04:46.351
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (id, "roomNumber", floor, "createdAt", "updatedAt", "buildingId") FROM stdin;
7e468140-c644-4160-9eb9-03bd368b9a38	104	2st	2023-09-05 16:45:26.961	2023-09-05 16:45:26.961	1372868e-9ba2-4685-a38a-88d34c301f7e
\.


--
-- Data for Name: semester_registrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.semester_registrations (id, "startDate", "endDate", status, "minCredit", "maxCredit", "createdAt", "updatedAt", "academicSemesterId") FROM stdin;
ac3887de-c13f-4f81-9e24-b441bc0f6c1c	2023-07-01 00:00:00	2023-07-15 00:00:00	UPCOMING	13	15	2023-09-05 18:22:17.355	2023-09-05 18:56:01.948	36e376f3-8bf9-44a9-9523-cf2ca20035c7
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, "studentId", "firstName", "lastName", "middleName", "profileImage", email, "contactNo", gender, "bloodGroup", "createdAt", "updatedAt", "academicSemesterId", "academicFacultyId", "academicDepartmentId") FROM stdin;
ecee8870-0cad-478c-98cb-cba7662369a9	230100002	Asad10	santo		image link	asad20@gmail.com	01886476123	male	B+	2023-09-05 16:45:07.229	2023-09-05 16:45:07.229	36e376f3-8bf9-44a9-9523-cf2ca20035c7	8ecb6198-111d-4cb8-bdda-7872268db08a	fae8c6e5-31cc-4eec-803e-28e3c39bc074
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: academic_depertment academic_depertment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_depertment
    ADD CONSTRAINT academic_depertment_pkey PRIMARY KEY (id);


--
-- Name: academic_faculty academic_faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_faculty
    ADD CONSTRAINT academic_faculty_pkey PRIMARY KEY (id);


--
-- Name: academic_semester academic_semester_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_semester
    ADD CONSTRAINT academic_semester_pkey PRIMARY KEY (id);


--
-- Name: buildings buildings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT buildings_pkey PRIMARY KEY (id);


--
-- Name: courseToPrerequisites courseToPrerequisites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."courseToPrerequisites"
    ADD CONSTRAINT "courseToPrerequisites_pkey" PRIMARY KEY ("courseId", "preRequisiteId");


--
-- Name: course_faculties course_faculties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_faculties
    ADD CONSTRAINT course_faculties_pkey PRIMARY KEY ("courseId", "facultyId");


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: faculties faculties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_pkey PRIMARY KEY (id);


--
-- Name: offered_courses offered_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offered_courses
    ADD CONSTRAINT offered_courses_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: semester_registrations semester_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semester_registrations
    ADD CONSTRAINT semester_registrations_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: academic_depertment academic_depertment_academicFacultyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_depertment
    ADD CONSTRAINT "academic_depertment_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES public.academic_faculty(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: courseToPrerequisites courseToPrerequisites_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."courseToPrerequisites"
    ADD CONSTRAINT "courseToPrerequisites_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: courseToPrerequisites courseToPrerequisites_preRequisiteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."courseToPrerequisites"
    ADD CONSTRAINT "courseToPrerequisites_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: course_faculties course_faculties_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_faculties
    ADD CONSTRAINT "course_faculties_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: course_faculties course_faculties_facultyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_faculties
    ADD CONSTRAINT "course_faculties_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES public.faculties(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: faculties faculties_academicDepartmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT "faculties_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES public.academic_depertment(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: faculties faculties_academicFacultyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT "faculties_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES public.academic_faculty(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: offered_courses offered_courses_academicDepartmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offered_courses
    ADD CONSTRAINT "offered_courses_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES public.academic_depertment(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: offered_courses offered_courses_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offered_courses
    ADD CONSTRAINT "offered_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: offered_courses offered_courses_semesterRegistrationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offered_courses
    ADD CONSTRAINT "offered_courses_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES public.semester_registrations(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: rooms rooms_buildingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT "rooms_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES public.buildings(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: semester_registrations semester_registrations_academicSemesterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semester_registrations
    ADD CONSTRAINT "semester_registrations_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES public.academic_semester(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: students students_academicDepartmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "students_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES public.academic_depertment(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: students students_academicFacultyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "students_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES public.academic_faculty(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: students students_academicSemesterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "students_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES public.academic_semester(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--
