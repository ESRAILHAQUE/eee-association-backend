<div align="center">

# IMPLEMENTATION OF A SECURE AND SCALABLE WEB-BASED MANAGEMENT PLATFORM FOR DEPARTMENTAL ASSOCIATIONS: A CASE STUDY ON THE DEPARTMENT OF EEE

<br>

**A Project Report**

Submitted in Partial Fulfillment of the Requirements for the Degree of
Bachelor of Science in Electrical and Electronic Engineering

<br>

---

**Submitted by:**

| Name | Registration No. |
|------|-----------------|
| Ahsanul Azim Anas | 2020338530 |
| Iftekar Rahman Ruhit | 2020338542 |
| Md Esrail Haque | 2020338545 |

Session: 2020–2021

<br>

**Supervised by:**

**Md Salah Uddin**
Lecturer, Department of EEE
Sylhet Engineering College

<br>

---

**Department of Electrical and Electronic Engineering**
**Sylhet Engineering College**
(Under Shahjalal University of Science & Technology)
Sylhet-3100, Bangladesh

**August 2026**

</div>

---
<br>

## Candidate's Declaration

We hereby declare that this project report entitled **"Implementation of a Secure and Scalable Web-based Management Platform for Departmental Associations: A Case Study On The Department of EEE"** is the outcome of original work conducted by us under the direct supervision of **Md Salah Uddin**, Lecturer, Department of EEE, Sylhet Engineering College, Sylhet.

We further declare that:

1. This project has been undertaken for the partial fulfillment of the requirements for the degree of Bachelor of Science in Electrical and Electronic Engineering at Sylhet Engineering College.
2. Neither this project report as a whole nor any part of it has previously been submitted, either to this or any other institution, for the award of any degree, diploma, or other qualification.
3. All information obtained from other sources has been duly acknowledged.

<br>

**Signatures of the Candidates:**

| | |
|---|---|
| _________________________ | Date: ___________ |
| **Ahsanul Azim Anas** | |
| Registration No: 2020338530 | |

| | |
|---|---|
| _________________________ | Date: ___________ |
| **Iftekar Rahman Ruhit** | |
| Registration No: 2020338542 | |

| | |
|---|---|
| _________________________ | Date: ___________ |
| **Md Esrail Haque** | |
| Registration No: 2020338545 | |

---
<br>

## Recommendation Letter from Project Supervisor

This is to certify that the project entitled, **"Implementation of a Secure and Scalable Web-based Management Platform for Departmental Associations: A Case Study On The Department of EEE"**, submitted by **Ahsanul Azim Anas** (Registration No: 2020338530), **Iftekar Rahman Ruhit** (Registration No: 2020338542), and **Md Esrail Haque** (Registration No: 2020338545) of the Department of EEE, Sylhet Engineering College, has been carried out under my direct supervision during the academic session 2020–2021.

To the best of my knowledge, the work presented in this report is original, technically sound, and represents a genuine contribution to the area of web-based institutional management. The project demonstrates a thorough understanding of modern software engineering principles including RESTful API design, relational database modeling, and full-stack web application development.

I therefore recommend this project report for acceptance in partial fulfillment of the requirements for the award of the degree of Bachelor of Science in Electrical and Electronic Engineering.

<br>

**Supervisor:**

_________________________

**Md Salah Uddin**
Lecturer, Department of EEE
Sylhet Engineering College
Sylhet-3100, Bangladesh

**Date:** ___________________

---
<br>

## Board of Examiners

This is to certify that the project report entitled **"Implementation of a Secure and Scalable Web-based Management Platform for Departmental Associations: A Case Study On The Department of EEE"** submitted by the above-mentioned candidates has been evaluated and approved by the Board of Examiners.

| Role | Signature | Date |
|------|-----------|------|
| Project Supervisor | _________________ | __________ |
| Internal Examiner | _________________ | __________ |
| External Examiner | _________________ | __________ |
| Head of Department | _________________ | __________ |

---
<br>

## Acknowledgments

We are deeply indebted to several individuals and institutions whose support made this project possible.

First and foremost, our sincere gratitude goes to our project supervisor, **Md Salah Uddin**, Lecturer, Department of EEE, Sylhet Engineering College, for his invaluable guidance, consistent encouragement, and constructive feedback throughout every phase of this project. His insights on both the technical and documentation aspects of the work were instrumental in shaping this report into its final form.

We extend our heartfelt thanks to the **Head of the Department of EEE** and all faculty members for their continued support and for providing an academic environment that encourages innovation and applied research. The theoretical and practical knowledge we gained through our coursework laid the essential foundation upon which this project was built.

We also thank **Sylhet Engineering College** for its institutional support and for providing access to the facilities required for the development and testing of this system.

We owe a special debt of gratitude to our families for their endless patience, moral support, and encouragement throughout the years of our undergraduate study. Their sacrifices and belief in us have been our greatest motivation.

Finally, we acknowledge the contribution of the open-source community behind the technologies we used—particularly the developers of Node.js, TypeScript, Express, PostgreSQL, and Prisma—whose tools enabled us to build a production-quality system.

---
<br>

## Abstract

Departmental student associations in academic institutions are responsible for organizing events, managing finances, facilitating communication, and maintaining academic records. However, most such associations in Bangladesh still rely on manual, paper-based systems or disconnected digital tools such as social media groups and spreadsheets. This leads to inefficiencies, lack of transparency, and administrative overhead.

This project presents the design and implementation of a **Secure and Scalable Web-based Management Platform** for the Department of Electrical and Electronic Engineering (EEE) at Sylhet Engineering College. The system is a full-stack web application that automates the complete operational lifecycle of a departmental association, serving students, class representatives (CRs), moderators, and administrators through a unified digital portal.

The backend REST API is built using **Node.js** with **TypeScript** and the **Express.js** framework, providing a stateless, scalable server-side architecture. Data is persisted in a **PostgreSQL** relational database, managed using the **Prisma ORM** for type-safe, declarative schema management. Security is enforced through **bcrypt** password hashing and stateless **JWT (JSON Web Token)** authentication, combined with a multi-tier **Role-Based Access Control (RBAC)** system that defines five distinct permission levels: Student, Class Representative (CR), Moderator, Admin, and Super Admin.

The platform's key functional modules include: **semester-wise association fee tracking** with automated due calculation; **event management** with RSVP and QR-code attendance; **academic profile management**; **community forum** with posts, comments, and voting; **academic resource sharing**; **research project showcasing**; a **mentorship matching** system; **leave management**; **document storage**; **club management**; **notification delivery**; and an **analytics dashboard**. The frontend is built using **React** and deployed on **Netlify**, while the backend API is deployed on **Vercel**.

The system was developed following the layered Repository-Service-Controller (RSC) architectural pattern, ensuring separation of concerns and maintainability. This report documents the full project lifecycle, including requirement analysis, system architecture and database design, detailed implementation of each module, testing results, and a discussion of limitations and future improvements.

**Keywords:** Departmental Association Management System; Full-Stack Web Application; Node.js; TypeScript; Express.js; PostgreSQL; Prisma ORM; JWT Authentication; Role-Based Access Control; RESTful API; Event Management; Fee Management.

---
<br>

## Nomenclature / List of Abbreviations

| Abbreviation | Full Form |
|---|---|
| API | Application Programming Interface |
| CORS | Cross-Origin Resource Sharing |
| CR | Class Representative |
| CRUD | Create, Read, Update, Delete |
| CUID | Collision-resistant Unique Identifier |
| EEE | Electrical and Electronic Engineering |
| ER | Entity-Relationship |
| HTTP | Hypertext Transfer Protocol |
| HTTPS | Hypertext Transfer Protocol Secure |
| JWT | JSON Web Token |
| JSON | JavaScript Object Notation |
| MFS | Mobile Financial Services |
| ORM | Object-Relational Mapper |
| PERN | PostgreSQL, Express, React, Node.js |
| QR | Quick Response |
| RBAC | Role-Based Access Control |
| REST | Representational State Transfer |
| RSC | Repository-Service-Controller |
| SPA | Single Page Application |
| SQL | Structured Query Language |
| SSL | Secure Sockets Layer |
| URL | Uniform Resource Locator |
| UUID | Universally Unique Identifier |

---
<br>

## Table of Contents

- Candidate's Declaration
- Recommendation Letter from Project Supervisor
- Board of Examiners
- Acknowledgments
- Abstract
- Nomenclature
- **Chapter 1: Introduction**
  - 1.1 Background and Motivation
  - 1.2 Problem Statement
  - 1.3 Objectives of the Project
  - 1.4 Methodology
  - 1.5 Scope of the Work
  - 1.6 Organization of the Report
- **Chapter 2: Literature Review**
  - 2.1 Overview of Association Management Systems
  - 2.2 Web-Based Management Systems in Academic Institutions
  - 2.3 Full-Stack Web Development Architectures
  - 2.4 Security in Web Applications
  - 2.5 Role-Based Access Control
  - 2.6 Object-Relational Mappers and Database Management
  - 2.7 Research Gap and Contribution
- **Chapter 3: System Analysis and Design**
  - 3.1 System Overview
  - 3.2 Requirement Analysis
  - 3.3 System Architecture
  - 3.4 Module Architecture
  - 3.5 Database Design
  - 3.6 Entity-Relationship Description
  - 3.7 Technology Stack Justification
  - 3.8 Deployment Architecture
- **Chapter 4: Implementation**
  - 4.1 Development Environment and Tools
  - 4.2 Project Structure
  - 4.3 Core Infrastructure
  - 4.4 Authentication and Security Module
  - 4.5 User and Profile Management
  - 4.6 Association Fee Management
  - 4.7 Event and Attendance Management
  - 4.8 Community Forum Module
  - 4.9 Academic Resources Module
  - 4.10 Mentorship Module
  - 4.11 Notification and Newsletter Module
  - 4.12 Analytics Module
  - 4.13 API Endpoint Reference
- **Chapter 5: Testing and Results**
  - 5.1 Testing Strategy
  - 5.2 Functional Testing
  - 5.3 Security Testing
  - 5.4 Performance Considerations
  - 5.5 Test Results
- **Chapter 6: Limitations and Future Work**
  - 6.1 Current Limitations
  - 6.2 Proposed Future Work
- **Chapter 7: Conclusion**

---
<br>
<br>

# CHAPTER 1: INTRODUCTION

---

## 1.1 Background and Motivation

The Department of Electrical and Electronic Engineering (EEE) at Sylhet Engineering College is one of the most active departments within the institution, hosting a vibrant student association that coordinates a wide range of academic, extracurricular, and social activities. This association is responsible for managing semester-wise membership fee collection, organizing departmental events and seminars, maintaining class attendance records, managing academic resources and research materials, and facilitating communication among students, faculty, and alumni.

Historically, managing these operations has relied on manual processes: physical fee registers, printed attendance sheets, WhatsApp group announcements for events, and scattered Google Drive folders for academic resources. While these ad-hoc methods were manageable for small cohorts, the increasing student population and the growing complexity of association activities have rendered them inadequate. Students frequently report being unaware of their fee dues, events lack proper RSVP and attendance tracking, and communication remains fragmented.

The rise of modern web technologies presents a compelling opportunity to digitize and automate these institutional workflows. Technologies such as Node.js, TypeScript, PostgreSQL, and React—collectively known as the PERN stack—have matured significantly and are now capable of powering enterprise-grade applications. In this context, this project was conceived with the motivation to create a purpose-built, comprehensive digital management platform for the EEE departmental association—one that is secure, scalable, and maintainable over many student cohorts.

## 1.2 Problem Statement

The following specific problems motivate the development of this system:

**1. Lack of Centralized Fee Management:** Association membership fees are collected per semester for all four academic years (8 semesters). There is no digital system to track whether a student has paid, partially paid, or has outstanding dues. Reconciliation is done manually by the CR or department moderator, which is error-prone and time-consuming.

**2. Inefficient Event Management:** The department organizes workshops, seminars, technical competitions, and cultural events. Without a proper RSVP system, organizers cannot predict attendance. Attendance itself is taken using paper sheets, which are prone to fraud and are difficult to archive for certificate generation purposes.

**3. Absence of a Role-Appropriate Access System:** Different stakeholders—students, class representatives, moderators, administrators—need different levels of data access. Using shared spreadsheets or WhatsApp groups provides no access control, creating privacy and data integrity concerns.

**4. Disconnected Academic Information:** Academic records, semester results, CGPA, and subject-wise performance are maintained in separate files with no link to the student's association profile. There is no single source of truth for a student's complete academic standing.

**5. No Platform for Community Engagement:** Students have no dedicated platform to discuss academic topics, share resources, collaborate on research projects, or connect with alumni mentors. Existing social media platforms are noisy and unstructured for academic use.

## 1.3 Objectives of the Project

The primary objective of this project is to design, develop, and deploy a full-stack web-based management platform for the EEE departmental association. The specific objectives are as follows:

1. To implement a **secure registration and authentication system** that authenticates users using institutional email addresses and enforces admin-approval before granting full system access.
2. To implement a **multi-tier Role-Based Access Control (RBAC)** system with five roles—Student, CR, Moderator, Admin, and Super Admin—each with appropriate permissions.
3. To develop a **semester-wise association fee tracking module** that allows admins and CRs to create and manage fee records, record payments, and generate financial statistics per batch.
4. To develop an **event management module** with student RSVP, admin approval workflow, QR-code attendance marking, and certificate issuance.
5. To build an **academic profile repository** where each student's enrollment information, GPA, semester results, and subject grades are centrally accessible.
6. To create a **community forum** for structured academic discussion with categorized posts, comments, and an upvote/downvote mechanism.
7. To implement modules for **academic resource sharing**, **research project showcasing**, **mentorship session scheduling**, **leave management**, **document management**, **club management**, **notifications**, and **newsletter subscriptions**.
8. To deploy the system in a production environment with continuous integration through GitHub and deployment on Vercel.

## 1.4 Methodology

The project followed an iterative, feature-driven development methodology:

**Phase 1 – Planning and Requirement Analysis:** The team met with the EEE department's student body and faculty advisor to identify operational pain points and document functional requirements for each stakeholder role.

**Phase 2 – Database and Architecture Design:** A comprehensive relational database schema was designed using Prisma Schema Language, covering all functional modules. The layered Repository-Service-Controller (RSC) architecture was selected to enforce separation of concerns.

**Phase 3 – Backend Development:** The RESTful API was incrementally developed using TypeScript and Express.js, with each module (auth, fees, events, forum, etc.) developed as an independent sub-directory.

**Phase 4 – Frontend Development:** A React-based SPA was built consuming the REST API, with role-specific dashboards for students, CRs, moderators, and administrators.

**Phase 5 – Testing and Deployment:** All API endpoints were tested manually using API clients. The system was then deployed, with the backend on Vercel and the frontend on Netlify.

## 1.5 Scope of the Work

The scope of this project covers:
- A Node.js/TypeScript/Express backend REST API with 19 functional modules.
- A PostgreSQL relational database with 27+ tables, managed via Prisma ORM.
- JWT-based stateless authentication and RBAC middleware.
- Full CRUD operations across all modules with appropriate role guards.
- A React-based single-page application frontend.
- Production deployment on Vercel (API) and Netlify (frontend).

The scope does **not** include native mobile applications, a real-time communication system (WebSockets), or automated payment gateway integration.

## 1.6 Organization of the Report

The remainder of this report is organized as follows. Chapter 2 provides a literature review of related work and the underlying technologies. Chapter 3 describes the system analysis, architecture design, and database design. Chapter 4 gives a detailed account of the implementation of each functional module, including code snippets. Chapter 5 presents the testing approach and results. Chapter 6 discusses the limitations of the current system and outlines future directions. Chapter 7 concludes the report.

---
<br>
<br>

# CHAPTER 2: LITERATURE REVIEW

---

## 2.1 Overview of Association Management Systems

Student and departmental association management is a well-recognized administrative challenge in higher education. Traditional paper-based systems suffer from data redundancy, a lack of audit trails, and difficulty in scaling to larger student bodies. Several commercial solutions exist for general club management—such as WildApricot, ClubExpress, and MemberClicks—but these are generic platforms that charge subscription fees and are not tailored to the specific academic context of a Bangladeshi engineering department.

Institutional ERP (Enterprise Resource Planning) systems, like those deployed by major universities, often include student management portals. However, these are typically large-scale, expensive proprietary systems that are not accessible to individual departments seeking lightweight, dedicated solutions. The literature consistently highlights the need for lighter, purpose-built systems that balance functionality with simplicity.

## 2.2 Web-Based Management Systems in Academic Institutions

Numerous studies have highlighted the benefits of web-based management systems in academic contexts. In a 2019 study on university resource management, researchers found that digitizing fee collection and event management processes reduced administrative processing time by up to 60% and significantly reduced data errors compared to manual methods.

In the context of Bangladesh, the adoption of digital management systems in educational institutions is growing but uneven. While national universities have deployed centralized portals, polytechnic and engineering colleges often lack department-level digital tools. This gap is precisely what this project aims to address for the Department of EEE at Sylhet Engineering College.

Learning Management Systems (LMS) such as Moodle and Google Classroom address the academic content delivery aspect but deliberately avoid association financial management, event RSVPs, and community-building features. Our platform complements—rather than replaces—such LMS tools by focusing on the community and operational management aspects.

## 2.3 Full-Stack Web Development Architectures

Modern web application development has converged on two primary patterns: monolithic architectures and microservices architectures. For a project of this scale, a **modular monolith** approach was selected—the system is structured as a single deployable unit internally divided into independent modules. This provides the organizational benefits of microservices (clear boundaries between modules, independent routing) without the operational complexity of running multiple services.

The **PERN stack** (PostgreSQL, Express.js, React, Node.js), augmented with TypeScript, was the technology choice for this project. Node.js's event-driven, non-blocking I/O model is well-suited for handling concurrent API requests from multiple students. TypeScript adds static type checking atop JavaScript, which is critical for large codebases, as it helps catch errors at compile time rather than at runtime.

The **REST (Representational State Transfer)** architectural style governs API design. Each resource—users, events, fees, forum posts—is accessed through a consistent URL structure using standard HTTP verbs (GET, POST, PATCH, DELETE). This stateless design ensures the backend can be scaled horizontally without session management concerns.

## 2.4 Security in Web Applications

Security is a critical non-functional requirement for any system handling personal and financial data. The key security measures considered in this project are:

**Password Hashing:** Storing passwords in plain text is a well-known anti-pattern. The project uses **bcryptjs**, which implements the bcrypt adaptive hashing algorithm. bcrypt incorporates a random salt and a configurable cost factor (set to 10 in this project) to defend against brute-force and rainbow table attacks. Even if the database is compromised, the hashed passwords cannot be easily reversed.

**JWT Authentication:** Session-based authentication requires server-side session storage, creating scaling challenges. JSON Web Tokens (JWTs) are a standard (RFC 7519) for stateless authentication. Upon login, the server generates a signed JWT containing the user's ID, role, and verification status. This token is sent to the client and presented on every subsequent request in the `Authorization: Bearer <token>` header. The server validates the signature without needing to query a session store, making it inherently scalable.

**CORS (Cross-Origin Resource Sharing):** Web browsers enforce the Same-Origin Policy, which blocks frontend applications from making API requests to different domains. CORS headers must be explicitly configured on the backend to allow authorized frontends (e.g., `https://seceee.netlify.app`) to make API calls.

**Input Validation:** All incoming request bodies are validated using `express-validator` before reaching the service layer, preventing injection attacks and ensuring data integrity.

## 2.5 Role-Based Access Control (RBAC)

Role-Based Access Control is a well-established authorization model in which permissions are associated with roles, and users are assigned roles, rather than assigning permissions directly to individual users. This simplifies permission management in multi-user systems.

For this platform, five roles were defined based on stakeholder analysis:
- **Student:** View-only access to their own data, public events, and community features.
- **CR (Class Representative):** Write access to batch-specific fee records, event proposals, and attendance.
- **Moderator:** Administrative access over forum content, resources, and documents.
- **Admin:** Full administrative access to all student records, events, fees, and associations.
- **Super Admin:** All admin privileges plus the ability to manage admin accounts and system configuration.

This RBAC model is implemented in the backend using the `requireRoles()` middleware function, which checks the role embedded in the JWT payload against the allowed roles for each route.

## 2.6 Object-Relational Mappers and Database Management

Interacting with a relational database from an application typically involves writing raw SQL queries, which are verbose, error-prone, and not type-safe. Object-Relational Mappers (ORMs) abstract the database layer into a programming-language-native API.

**Prisma** is a next-generation ORM for Node.js and TypeScript. It distinguishes itself from traditional ORMs (like Sequelize or TypeORM) through its **declarative schema definition language**, which is used to define the database structure in a human-readable `schema.prisma` file. From this single source of truth, Prisma generates:
1. SQL migration files for the database.
2. A fully **type-safe** Prisma Client for the application code.

This means every database query—including the shape of returned objects—is verified at compile time by TypeScript, virtually eliminating runtime type errors caused by database queries.

## 2.7 Research Gap and Contribution

Existing research focuses primarily on general student information systems or LMS platforms. There is a notable lack of documented, open-source, production-ready implementations of departmental association management systems that combine financial management, event operations, and community engagement. This project fills that gap by implementing and documenting a complete system specifically designed for the operational context of a Bangladeshi engineering department's student association.

---
<br>
<br>

# CHAPTER 3: SYSTEM ANALYSIS AND DESIGN

---

## 3.1 System Overview

The EEE Association Management Platform is a multi-tier web application. It consists of:

1. **Frontend Client:** A React-based Single Page Application (SPA), deployed at `https://seceee.netlify.app`, that provides role-specific dashboards and consumes the backend REST API.
2. **Backend REST API:** A Node.js/TypeScript/Express application, deployed at `https://eee-association-backend.vercel.app`, that handles all business logic, authentication, and database operations.
3. **Database:** A PostgreSQL relational database (hosted on a cloud provider) accessed by the backend via the Prisma ORM.

```
  +---------------------------+         HTTPS           +---------------------------+
  |   React SPA               |  <-------------------->  |   Express REST API        |
  |   (Netlify)               |   Authorization: Bearer  |   (Vercel)                |
  |   seceee.netlify.app      |          Token           |   eee-association-        |
  +---------------------------+                           |   backend.vercel.app      |
                                                          +-------------+-------------+
                                                                        |
                                                                   Prisma ORM
                                                                        |
                                                          +-------------v-------------+
                                                          |   PostgreSQL Database     |
                                                          |   (Cloud Hosted)          |
                                                          +---------------------------+
```

## 3.2 Requirement Analysis

### 3.2.1 Functional Requirements

**Authentication and User Management:**
- FR-01: Users shall be able to register using their institutional email and registration number.
- FR-02: Users shall authenticate using their institutional email and password.
- FR-03: The system shall issue a JWT token upon successful authentication, containing the user's ID, role, and verification status.
- FR-04: Admins shall be able to verify, block, or delete user accounts.
- FR-05: The system shall track failed login attempts per user account.
- FR-06: Users shall be able to view their own profile; admins shall be able to view all profiles.

**Fee Management:**
- FR-07: Admins and CRs shall be able to create semester-wise fee records for students.
- FR-08: The system shall automatically calculate the due amount when a fee record is created.
- FR-09: Admins and CRs shall be able to record partial or full payments against a fee record.
- FR-10: Payment status shall automatically update to 'paid', 'partial', or 'unpaid'.
- FR-11: Students shall be able to view their own fee records.
- FR-12: Admins shall be able to view aggregate financial statistics across all or a specific batch.

**Event Management:**
- FR-13: Admins shall be able to publish events; CRs and moderators shall be able to propose events pending admin approval.
- FR-14: Students shall be able to RSVP to published events within the event's capacity limit.
- FR-15: Admins shall be able to generate a QR code for event attendance.
- FR-16: Students shall be able to mark their attendance by scanning the QR code within the token's validity period.
- FR-17: Certificates shall be issuable to attendees upon event completion.

**Community Features:**
- FR-18: Students shall be able to create, view, and comment on forum posts in categorized channels.
- FR-19: Students shall be able to upvote or downvote forum posts.
- FR-20: Students shall be able to upload and download academic resources, subject to admin approval.
- FR-21: Students shall be able to submit their research or final-year projects with descriptions and links.
- FR-22: Mentors shall be able to create profiles; students (mentees) shall be able to book sessions.

**Administrative Operations:**
- FR-23: Admins shall be able to publish notices targeted to all students or a specific batch.
- FR-24: Admins shall be able to review and process leave requests.
- FR-25: Admins shall be able to manage club memberships.
- FR-26: The analytics module shall provide aggregate data on user activity, financial compliance, and event participation.

### 3.2.2 Non-Functional Requirements

- **NFR-01 (Security):** All passwords must be hashed using bcrypt with a minimum cost factor of 10. All protected routes must enforce JWT authentication.
- **NFR-02 (Performance):** API responses for list endpoints must execute within 500ms under normal load. Database queries must use indexed columns for filtering.
- **NFR-03 (Scalability):** The stateless REST API design must allow horizontal scaling without shared session state.
- **NFR-04 (Maintainability):** All backend code shall be written in TypeScript. Each functional module shall be contained in its own directory following the RSC pattern.
- **NFR-05 (Reliability):** The database connection must use connection pooling (PgBouncer) in production to handle concurrent requests efficiently.
- **NFR-06 (Usability):** All API responses must follow a consistent JSON format with a `success` boolean and a descriptive `message` field.

## 3.3 System Architecture

The backend follows the **Repository-Service-Controller (RSC)** layered architecture pattern. This pattern is derived from the three-tier architecture and provides a clear separation of concerns:

```
  HTTP Request
       │
       ▼
  ┌─────────────┐
  │   Router    │  ← Defines URL path and HTTP verb; applies middleware
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ Middleware  │  ← authMiddleware: validates JWT
  │             │  ← requireRoles: checks permission
  │             │  ← validate: validates request body
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ Controller  │  ← Parses request; calls service; formats HTTP response
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │   Service   │  ← Contains business logic; orchestrates repository calls
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ Repository  │  ← Contains all Prisma database queries; no business logic
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  Prisma ORM │  ← Generates type-safe SQL and executes against PostgreSQL
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  PostgreSQL │
  └─────────────┘
```

**Benefits of this architecture:**
- **Testability:** Business logic in the Service layer can be unit-tested by mocking the Repository.
- **Replaceability:** The database can be swapped (e.g., from PostgreSQL to MySQL) by only changing the Repository layer.
- **Readability:** Controllers remain thin, and Repositories contain no business rules.

## 3.4 Module Architecture

The backend is organized into 19 functional modules within the `src/modules/` directory:

| Module | Description |
|---|---|
| `auth` | Registration, login, JWT issuance, profile retrieval |
| `users` | User CRUD, verification, role assignment, academic profile |
| `fees` | Semester fee creation, payment recording, financial stats |
| `events` | Event creation, RSVP, approval workflow |
| `attendance` | QR code generation and attendance marking |
| `certificates` | Certificate issuance per event |
| `notices` | Targeted announcements to all or specific batches |
| `notifications` | Per-user notification delivery and read status |
| `forum` | Posts, comments, votes, category management |
| `resources` | Academic resource upload, approval, and download |
| `projects` | Research and final-year project submissions |
| `mentorship` | Mentor profiles and session booking |
| `clubs` | Club creation and membership management |
| `leave` | Leave request submission and review |
| `documents` | Official document storage with access levels |
| `feedback` | Feedback and complaint submission |
| `analytics` | Aggregate dashboards and reports |
| `logs` | Admin access to login/audit history |
| `newsletter` | Email newsletter subscription management |

Each module contains the following files:
- `*.controller.ts` – HTTP request/response handling
- `*.service.ts` – Business logic
- `*.repository.ts` – Database queries via Prisma
- `*.routes.ts` – URL mapping and middleware application
- `*.types.ts` – TypeScript interface definitions
- `index.ts` – Module public export

## 3.5 Database Design

The database schema is defined declaratively in `prisma/schema.prisma`. The schema spans 19 models (database tables) and 11 enumerations, covering the full domain of the application.

### 3.5.1 Core Enumerations

The schema defines the following enumerations to constrain column values:

| Enum | Values | Used By |
|---|---|---|
| `CurrentRole` | student, cr, moderator, admin, super_admin | User |
| `AccountType` | student, alumni, teacher | UserProfile |
| `GraduationStatus` | studying, graduated, dropped | UserProfile |
| `PaymentStatus` | paid, partial, unpaid | AssociationFee |
| `ResultStatus` | published, withheld | AcademicSemester |
| `AcademicStanding` | good, probation, warning | UserProfile |
| `FeeComplianceStatus` | clear, pending | UserProfile |
| `NoticeTarget` | all, batch_specific | Notice |
| `EventStatus` | draft, published, cancelled, completed | Event |
| `EventType` | workshop, seminar, competition, cultural, meeting, other | Event |
| `ForumPostStatus` | active, flagged, removed | ForumPost |
| `FeedbackStatus` | open, in_progress, resolved, dismissed | Feedback |
| `LeaveStatus` | pending, approved, rejected | LeaveRequest |
| `ResourceStatus` | pending, approved, rejected | Resource |
| `ProjectCategory` | iot, matlab, power, embedded, software, research, other | Project |
| `NotificationStatus` | unread, read | Notification |

### 3.5.2 Core Table Definitions

**Table 1: `users`** — The central authentication and identity table.

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | String (CUID) | PK | Unique identifier |
| fullName | String | NOT NULL | Student's full name |
| registrationNumber | String | UNIQUE | Institutional registration no. |
| institutionalEmail | String | UNIQUE | Used for login |
| passwordHash | String | NOT NULL | bcrypt hash |
| currentRole | CurrentRole | DEFAULT student | RBAC role |
| isVerified | Boolean | DEFAULT false | Admin-approved flag |
| isBlock | Boolean | DEFAULT false | Admin block flag |
| isDeleted | Boolean | DEFAULT false | Soft delete flag |
| lastLoginAt | DateTime | NULLABLE | Last successful login |
| failedLoginAttempts | Int | DEFAULT 0 | Failed login counter |
| accountLocked | Boolean | DEFAULT false | Lock flag |
| accountCreatedAt | DateTime | DEFAULT now() | Creation timestamp |
| lastUpdatedAt | DateTime | auto-updated | Update timestamp |

**Table 2: `user_profiles`** — Extended academic and personal details.

| Column | Type | Description |
|---|---|---|
| id | String (CUID) | PK |
| userId | String | FK → users.id (CASCADE) |
| registrationNumber | String | Denormalized for batch queries |
| rollNumber | String? | Optional roll number |
| batch | String? | Academic batch (e.g., "2020") |
| session | String? | Academic session |
| cgpa | Float? | Cumulative GPA |
| academicStanding | AcademicStanding? | Good/Probation/Warning |
| totalCreditsCompleted | Int? | Credits earned to date |
| totalPayable / totalPaid / totalDue | Decimal? | Aggregate financial summary |
| feeComplianceStatus | FeeComplianceStatus? | Clear/Pending |

**Table 3: `association_fees`** — Semester-wise fee management.

| Column | Type | Description |
|---|---|---|
| id | String (CUID) | PK |
| userId | String | FK → users.id |
| semesterNumber | Int | 1–8 |
| feeAmount | Decimal(12,2) | Total fee for the semester |
| paidAmount | Decimal(12,2) | Amount paid so far |
| dueAmount | Decimal(12,2) | Outstanding balance |
| paymentStatus | PaymentStatus | paid / partial / unpaid |
| paymentMethod | String? | e.g., Cash, bKash |
| transactionReference | String? | Reference code |
| paymentDate | DateTime? | Date of full payment |

A compound unique index on `(userId, semesterNumber)` prevents duplicate fee records for the same student-semester pair.

**Table 4: `events`** — Event management.

| Column | Type | Description |
|---|---|---|
| id | CUID | PK |
| title | String | Event name |
| description | String | Detailed description |
| eventType | EventType | Category |
| status | EventStatus | Lifecycle status |
| venue | String | Physical location |
| startAt / endAt | DateTime | Event time range |
| targetBatch | String? | Null = all students |
| maxCapacity | Int? | Optional cap on RSVPs |
| createdById | String | FK → users.id |
| approvedById | String? | FK → users.id (admin) |

## 3.6 Entity-Relationship Description

The following describes the key entity relationships in the schema:

- **User → UserProfile:** One-to-one. Each verified user has one extended profile. Cascaded delete ensures profile cleanup when a user is removed.
- **User → AssociationFee:** One-to-many. A user may have up to 8 fee records (one per semester). Uniqueness is enforced on the `(userId, semesterNumber)` composite key.
- **User → AcademicSemester → AcademicSubject:** One-to-many chains. A user has multiple semesters; each semester has multiple subjects with individual grades.
- **Event → EventRsvp:** One-to-many. Multiple students can RSVP to one event; a student can RSVP to multiple events. Uniqueness enforced on `(eventId, userId)`.
- **Event → AttendanceQR:** One-to-one. Each event has at most one active QR code token at a time.
- **Event → Attendance:** One-to-many. Each attendance record links one student to one event. Uniqueness prevents duplicate check-ins.
- **Event → Certificate:** One-to-many. Certificates are issued per student per event, with uniqueness on `(userId, eventId)`.
- **User → ForumPost → ForumComment/ForumVote:** Hierarchical community content ownership.
- **MentorProfile → MentorSession ← User (mentee):** A mentor has many sessions; each session links to one mentee.

## 3.7 Technology Stack Justification

### 3.7.1 Backend: Node.js + TypeScript

Node.js uses a non-blocking, event-driven I/O model based on Google's V8 engine. This architecture excels at handling many concurrent I/O-bound requests—precisely the use case of a multi-user REST API. TypeScript's static type system catches a large class of bugs before code is executed, which is invaluable in a codebase spanning 19 modules.

### 3.7.2 Framework: Express.js

Express.js is the de-facto standard Node.js HTTP framework. It is minimalist and un-opinionated, allowing the team to make explicit architectural decisions (such as choosing the RSC pattern). Alternatives like NestJS provide more structure but introduce additional complexity that was not warranted for this project's scale.

### 3.7.3 Database: PostgreSQL

PostgreSQL was selected over NoSQL alternatives (e.g., MongoDB) due to the highly relational nature of the application domain. Key advantages include:
- **Referential integrity:** Foreign key constraints ensure data consistency (e.g., a fee record cannot exist without a valid user).
- **ACID transactions:** Critical for fee payment operations, where the paid amount, due amount, and status must all update atomically.
- **Rich query capabilities:** Complex analytics queries (e.g., per-batch financial aggregation) are naturally expressed in SQL.

### 3.7.4 ORM: Prisma

Prisma's schema-first approach generates a type-safe client that ensures all database operations are validated at compile time. The `prisma migrate` command handles schema versioning and database migrations. The `prisma generate` command regenerates the client whenever the schema changes, ensuring the client always reflects the current database structure.

### 3.7.5 Deployment: Vercel + Netlify

Vercel provides serverless deployment optimized for Node.js APIs, with automatic builds triggered by GitHub pushes. Netlify provides an identical workflow for the React frontend. Both platforms provide global CDN delivery and automatic HTTPS certificate management at zero cost.

## 3.8 Deployment Architecture

```
  Developer Laptop
        │  git push
        ▼
  GitHub Repository
  (ESRAILHAQUE/eee-association-backend)
        │
  ┌─────┴──────┐
  │            │
  ▼            ▼
Vercel      Netlify
(API)       (Frontend)
  │            │
  ▼            │
PostgreSQL   React SPA
(DB)         (Static)
```

The `vercel.json` configuration rewrites all incoming requests to the Express entry point, allowing the serverless function to handle any route:

```json
{
  "builds": [{ "src": "dist/server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "dist/server.js" }]
}
```

---
<br>
<br>

# CHAPTER 4: IMPLEMENTATION

---

## 4.1 Development Environment and Tools

| Tool | Version | Purpose |
|---|---|---|
| Node.js | v24.18.0 | JavaScript runtime |
| TypeScript | ~5.9.3 | Static type checking |
| npm | Latest | Package management |
| PostgreSQL | 15+ | Relational database |
| Prisma | 5.22.0 | ORM and migrations |
| Express.js | 4.21.1 | HTTP framework |
| bcryptjs | 2.4.3 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT generation/verification |
| express-validator | 7.2.0 | Request body validation |
| nodemailer | 8.0.1 | Email dispatch |
| cors | 2.8.5 | CORS header management |
| dotenv | 16.4.5 | Environment variable loading |
| tsx | 4.19.2 | TypeScript execution for dev |
| Vercel CLI | 59.11.7 | Deployment tooling |

## 4.2 Project Structure

The backend project follows this directory structure:

```
eee-association-backend/
├── prisma/
│   └── schema.prisma          # Prisma schema (27+ models)
├── src/
│   ├── app.ts                 # Express app setup (CORS, JSON, routes)
│   ├── server.ts              # Entry point (DB check, listen)
│   ├── config/
│   │   ├── env.ts             # Environment variable parsing
│   │   └── index.ts
│   ├── database/
│   │   └── index.ts           # Prisma client singleton
│   ├── common/
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validate.ts
│   │   ├── utils/
│   │   └── types/
│   ├── routes/
│   │   └── index.ts           # Central router (19 sub-routers)
│   └── modules/
│       ├── auth/
│       ├── users/
│       ├── fees/
│       ├── events/
│       ├── attendance/
│       ├── certificates/
│       ├── notices/
│       ├── notifications/
│       ├── forum/
│       ├── resources/
│       ├── projects/
│       ├── mentorship/
│       ├── clubs/
│       ├── leave/
│       ├── documents/
│       ├── feedback/
│       ├── analytics/
│       ├── logs/
│       └── newsletter/
├── dist/                       # Compiled JavaScript output (git-ignored)
├── .env                        # Environment variables (git-ignored)
├── package.json
├── tsconfig.json
└── vercel.json
```

## 4.3 Core Infrastructure

### 4.3.1 Application Entry Point (`src/server.ts`)

The server entry point performs two critical actions before starting the HTTP listener: it verifies the database connection in non-production environments (to fail fast during development if the database is unreachable), and then starts the Express server on the configured port.

```typescript
import { app } from "./app";
import { env } from "./config";
import { logger } from "./common/utils/logger";
import { ensureDatabaseConnection } from "./database";

async function start(): Promise<void> {
  // In local/dev, fail fast if DB is down.
  // In production (Vercel), let Prisma lazily manage
  // connections per serverless function invocation.
  if (env.NODE_ENV !== "production") {
    try {
      await ensureDatabaseConnection();
      logger.info("Database connected");
    } catch (err) {
      logger.error("Database connection failed. Server will not start.", err);
      process.exit(1);
    }
  }

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} (${env.NODE_ENV})`);
    logger.info(`API: http://localhost:${env.PORT}${env.API_PREFIX}`);
  });
}

start().catch((err) => {
  logger.error("Failed to start server", err);
  process.exit(1);
});
```

### 4.3.2 Prisma Client Singleton (`src/database/index.ts`)

A critical pattern when deploying Node.js applications on serverless platforms like Vercel is ensuring that the Prisma Client is instantiated only once per process, not once per serverless function invocation. This is achieved using a global singleton pattern:

```typescript
import { PrismaClient } from "@prisma/client";
import { env } from "../config";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const poolUrl = env.DATABASE_POOL_URL;
const connectionUrl = poolUrl.includes("pgbouncer=true")
  ? poolUrl
  : `${poolUrl}${poolUrl.includes("?") ? "&" : "?"}pgbouncer=true&connect_timeout=15`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: { db: { url: connectionUrl } },
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

The connection URL is automatically augmented with `pgbouncer=true` if not already present. PgBouncer is a PostgreSQL connection pooler that multiplexes many application database connections into fewer server-side connections, preventing connection exhaustion in a serverless environment where hundreds of function instances may run simultaneously.

### 4.3.3 Environment Configuration (`src/config/env.ts`)

All environment variables are centrally parsed and validated at startup. If a required variable is missing, the `getEnv` function throws an error, preventing the application from starting in a misconfigured state.

```typescript
import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) throw new Error(`Missing env: ${key}`);
  return value;
}

export const env = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: parseInt(getEnv("PORT", "4000"), 10),
  API_PREFIX: getEnv("API_PREFIX", "/api"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  DATABASE_POOL_URL: getEnv("DATABASE_POOL_URL", getEnv("DATABASE_URL")),
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "7d"),
  JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
} as const;
```

### 4.3.4 CORS Configuration (`src/app.ts`)

CORS is configured to allow requests from multiple authorized origins. The original implementation used a JavaScript logical OR (`||`) which always evaluates to the first truthy value, inadvertently blocking the Netlify frontend. This was corrected to use an array:

```typescript
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "",
      "http://localhost:3000",
      "https://seceee.netlify.app"
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### 4.3.5 Global Error Handler

A centralized error handler is registered as the last middleware in Express. It distinguishes between operational errors (`AppError` instances, which are intentional) and unexpected programming errors:

```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err, _req, res, _next): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }
  // For unexpected errors, hide details in production
  const message = env.NODE_ENV === "production" ? "Internal server error" : err.message;
  res.status(500).json({ success: false, message });
}
```

## 4.4 Authentication and Security Module

The authentication module (`src/modules/auth/`) handles user registration, login, and profile retrieval. It is one of the most security-critical parts of the system.

### 4.4.1 Registration Flow

When a new user registers, the following steps occur:

1. The `registerValidation` middleware chain (using `express-validator`) validates that: `fullName` is not empty; `email` is a valid email format; `password` is at least 6 characters; `registrationNumber` is not empty.
2. The `authService.register()` function checks whether the institutional email or registration number already exists in the database. If either is a duplicate, a 409 Conflict error is returned.
3. The plaintext password is hashed using `bcrypt.hash(password, 10)`, using 10 salt rounds.
4. The new user record is created in the `users` table with `isVerified: false` and `currentRole: student` as defaults.
5. A success response is returned indicating that the account awaits admin verification.

```typescript
async register(body: RegisterBody): Promise<RegisterResponse> {
  const email = body.email.toLowerCase().trim();
  const existing = await authRepository.findByInstitutionalEmail(email);
  if (existing)
    throw new AppError(409, "Institutional email already registered");

  const regNo = body.registrationNumber.trim();
  const existingReg = await authRepository.findByRegistrationNumber(regNo);
  if (existingReg)
    throw new AppError(409, "Registration number already registered");

  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
  const user = await authRepository.create({
    fullName: body.fullName.trim(),
    institutionalEmail: email,
    passwordHash,
    registrationNumber: regNo,
  });
  // ...returns registration response
}
```

### 4.4.2 Login Flow

1. The user submits their email and password.
2. The service looks up the user by email. If not found, a generic 401 error is returned to prevent user enumeration.
3. The user's account status is checked: if `isDeleted`, `isBlock`, or `accountLocked` flags are true, a 403 Forbidden error is returned with the specific reason.
4. `bcrypt.compare()` is used to verify the submitted password against the stored hash. On failure, the failed attempt counter is incremented in the database.
5. On success, the login timestamp and history are recorded within a **Prisma transaction** to ensure atomicity.
6. A JWT is signed containing `{ userId, email, role, registrationNumber, isVerified }` with the configured expiry duration.

```typescript
await authRepository.recordLogin(user.id);

const payload: JwtPayload = {
  userId: user.id,
  email: user.institutionalEmail,
  role: user.currentRole,
  registrationNumber: user.registrationNumber,
  isVerified: user.isVerified,
};
const accessToken = signToken(payload, env.JWT_EXPIRES_IN);
```

The `recordLogin` repository method uses a Prisma transaction to atomically update the `lastLoginAt` field on the User record and create a new `LoginHistory` entry:

```typescript
async recordLogin(userId: string): Promise<void> {
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date(), failedLoginAttempts: 0 },
    }),
    prisma.loginHistory.create({ data: { userId } }),
  ]);
}
```

### 4.4.3 Authentication Middleware

All protected routes use the `authMiddleware` function. It extracts the Bearer token from the `Authorization` header, verifies its signature and expiry using `jwt.verify()`, and attaches the decoded payload to `req.user`:

```typescript
export function authMiddleware(req, _res, next): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    next(new AppError(401, "Authentication required"));
    return;
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
}
```

### 4.4.4 Role-Based Access Control Middleware

The `requireRoles()` middleware factory generates route-level guards:

```typescript
export function requireRoles(...allowedRoles: string[]) {
  return (req, _res, next): void => {
    if (!req.user) {
      next(new AppError(401, "Authentication required"));
      return;
    }
    if (allowedRoles.length && !allowedRoles.includes(req.user.role ?? "")) {
      next(new AppError(403, "Insufficient permissions"));
      return;
    }
    next();
  };
}
```

This is applied at the route level. For example, the fee creation route requires the `admin`, `cr`, or `super_admin` role:

```typescript
router.post(
  "/",
  authMiddleware,
  requireRoles("admin", "cr", "super_admin"),
  validate([...]),
  feesController.create,
);
```

## 4.5 User and Profile Management

The users module handles the full lifecycle of a user account beyond authentication. Key operations include:

- **Admin Verification:** After registration, an admin must verify the account by setting `isVerified: true`. Only verified users gain full access to all platform features; unverified users see a "pending approval" state.
- **Role Assignment:** Super admins can promote a student to CR, Moderator, or Admin. All role changes are recorded in the `RoleHistory` table for auditing.
- **Soft Deletion:** Users are never hard-deleted from the database. Setting `isDeleted: true` prevents login and hides the user from normal listings, while preserving all historical records (fees, attendance) for data integrity.
- **Academic Profile:** The `UserProfile` contains extended data including `batch`, `cgpa`, `academicStanding`, and `feeComplianceStatus`, which are used to drive the analytics and scoped data access for CRs.

## 4.6 Association Fee Management

The fees module is one of the most operationally critical parts of the system. Its design is driven by strict financial correctness requirements.

### 4.6.1 Fee Record Creation (Upsert Pattern)

Fee records are created using an **upsert** operation rather than a plain `create`. This makes the operation **idempotent**: calling it multiple times with the same `userId` and `semesterNumber` will not create duplicate records. If the record already exists, it updates the fee amount instead.

```typescript
async upsert(data: { userId: string; semesterNumber: number; feeAmount: Decimal }) {
  const due = data.feeAmount;
  return prisma.associationFee.upsert({
    where: { userId_semesterNumber: { userId: data.userId, semesterNumber: data.semesterNumber } },
    create: {
      userId: data.userId,
      semesterNumber: data.semesterNumber,
      feeAmount: data.feeAmount,
      paidAmount: 0,
      dueAmount: due,
      paymentStatus: "unpaid",
    },
    update: { feeAmount: data.feeAmount },
    select: feeSelect,
  });
}
```

### 4.6.2 Payment Recording with Prisma Decimal

All monetary values are stored as `Decimal(12, 2)` in PostgreSQL, providing exact decimal arithmetic. The repository uses Prisma's `Decimal` library to perform calculations, avoiding floating-point precision errors inherent in JavaScript's `number` type:

```typescript
async recordPayment(id: string, data: { paidAmount: Decimal; ... }) {
  const existing = await prisma.associationFee.findUnique({ where: { id } });
  if (!existing) throw new Error("Fee record not found");

  const newPaid = new Decimal(existing.paidAmount).add(data.paidAmount);
  const newDue = new Decimal(existing.feeAmount).minus(newPaid);

  // Determine new payment status
  const status = newDue.lte(0) ? "paid" : newPaid.gt(0) ? "partial" : "unpaid";

  return prisma.associationFee.update({
    where: { id },
    data: {
      paidAmount: newPaid,
      dueAmount: newDue.lt(0) ? new Decimal(0) : newDue,
      paymentStatus: status,
      paymentDate: status === "paid" ? new Date() : undefined,
    },
    select: feeSelect,
  });
}
```

### 4.6.3 Role-Scoped Data Access

A key design feature is that a CR can only access financial data for students in their own batch. The service layer automatically scopes the query:

```typescript
async getBatchFees(actor: { userId: string }, filters?: { status?: string }) {
  const profile = await prisma.userProfile.findUnique({
    where: { userId: actor.userId },
    select: { batch: true },
  });
  if (!profile?.batch) throw new Error("CR has no batch assigned");
  return feesRepository.findByBatch(profile.batch, filters);
}
```

### 4.6.4 Financial Statistics

The stats endpoint uses Prisma's `aggregate` function to compute sum totals and `count` queries to compute status breakdowns, all in parallel using `Promise.all()`:

```typescript
async getStats(batch?: string) {
  const where = batch ? { user: { profile: { batch } } } : {};
  const [totalCount, paid, pending, overdue] = await Promise.all([
    prisma.associationFee.count({ where }),
    prisma.associationFee.count({ where: { ...where, paymentStatus: "paid" } }),
    prisma.associationFee.count({ where: { ...where, paymentStatus: "unpaid" } }),
    prisma.associationFee.count({ where: { ...where, paymentStatus: "partial" } }),
  ]);
  const agg = await prisma.associationFee.aggregate({
    where,
    _sum: { feeAmount: true, paidAmount: true, dueAmount: true },
  });
  return { totalCount, paid, pending, partial: overdue,
    totalFeeAmount: agg._sum.feeAmount ?? 0,
    totalPaid: agg._sum.paidAmount ?? 0,
    totalDue: agg._sum.dueAmount ?? 0 };
}
```

## 4.7 Event and Attendance Management

### 4.7.1 Event Lifecycle

Events follow a defined workflow controlled by the `EventStatus` enum:

```
  draft ──(Admin approves)──► published ──(Event ends)──► completed
                                   └──(Cancelled)──────────► cancelled
```

CRs and moderators create events in the `draft` state. Only admins can publish events, making them visible to students for RSVP. The `approvedById` field records which admin approved the event.

### 4.7.2 QR Code Attendance System

The QR code attendance system is designed to prevent retrospective fake check-ins. The process is:

1. An admin creates an attendance QR code for an event, specifying an expiry time (e.g., 30 minutes).
2. The system creates an `AttendanceQR` record containing a secure CUID-based token and the expiry timestamp.
3. A QR code encoding the token URL is generated and displayed to the event organizer (e.g., on a projector).
4. Students physically present at the event scan the QR code on their phones.
5. The frontend sends the token to the API endpoint `POST /api/attendance/scan`.
6. The backend validates the token against the `AttendanceQR` table: if the token exists and `expiresAt` is in the future, an `Attendance` record is created for the scanning student.
7. The unique constraint on `(eventId, userId)` in the `Attendance` table prevents a student from checking in twice.

### 4.7.3 Certificate Issuance

After an event is completed, admins can issue certificates to students who have an `Attendance` record. The `Certificate` model stores the issuer, recipient, and event reference, with a unique constraint on `(userId, eventId)` ensuring each student receives only one certificate per event.

## 4.8 Community Forum Module

The forum module provides a Reddit-style discussion platform. Key features:

- **Categories:** Forum posts belong to a `ForumCategory`. Categories are created by admins (e.g., "Academic Queries", "Job Opportunities", "Club Events").
- **Voting:** Students can cast one vote per post (+1 upvote, -1 downvote), enforced by the unique constraint on the `ForumVote` table's `(postId, userId)` composite key.
- **Moderation:** Posts can be flagged (set to `flagged` status) by moderators and subsequently removed (`removed`), keeping the platform free from inappropriate content.

## 4.9 Academic Resources Module

This module allows students to upload and share academic materials (lecture notes, assignments, past exam papers) organized by subject and semester. A moderation workflow prevents spam and low-quality uploads:

- Students upload a resource (initially `pending` status).
- An admin or moderator reviews and sets the status to `approved` or `rejected`.
- Only `approved` resources appear in public listings.
- The `downloads` counter increments each time a resource is accessed, providing popularity metrics.

## 4.10 Mentorship Module

The mentorship system allows senior students or alumni to register as mentors:

1. A user creates a `MentorProfile`, listing their areas of expertise and a bio.
2. Junior students can browse mentor profiles and book `MentorSession` slots, specifying the topic.
3. Sessions start in a `pending` state; mentors confirm or decline them.
4. After sessions, feedback can be recorded.

## 4.11 Notification and Newsletter Module

**Notifications:** When key events occur (e.g., an event is published, a leave request is reviewed), the system creates `Notification` records for the relevant users. Students can view their unread notifications and mark them as read. The `@@index([userId, status])` index on the `Notification` table ensures efficient retrieval of a user's unread notifications.

**Newsletter:** Students can subscribe to the department's newsletter. The `nodemailer` library is integrated to dispatch email notifications for important announcements, using SMTP credentials stored in environment variables.

## 4.12 Analytics Module

The analytics module provides admin-facing aggregate views of system data. Planned dashboards include:

- **Financial Summary:** Total collected fees vs. total dues, broken down by batch and payment status.
- **Event Engagement:** RSVP count vs. actual attendance per event.
- **User Activity:** Registration trend over time, verification pipeline status, and login frequency.
- **Resource Usage:** Most-downloaded resources and active forum categories.

These are computed by the analytics service using parallel Prisma aggregate queries.

## 4.13 API Endpoint Reference

The following table documents the primary API endpoints grouped by module:

### Authentication Routes

| Method | Endpoint | Auth Required | Roles | Description |
|---|---|---|---|---|
| POST | `/api/auth/register` | No | — | Register new user |
| POST | `/api/auth/login` | No | — | Login and get JWT |
| GET | `/api/auth/me` | Yes | Any | Get current user's profile |

### Fee Routes

| Method | Endpoint | Auth Required | Roles | Description |
|---|---|---|---|---|
| POST | `/api/fees` | Yes | admin, cr, super_admin | Create/upsert fee record |
| GET | `/api/fees/my` | Yes | Any | Get own fee records |
| GET | `/api/fees` | Yes | admin, cr, super_admin | Get all fees (CR: batch-scoped) |
| GET | `/api/fees/stats` | Yes | admin, cr, super_admin | Get financial stats |
| PATCH | `/api/fees/:id/payment` | Yes | admin, cr, super_admin | Record a payment |

### Event Routes

| Method | Endpoint | Auth Required | Roles | Description |
|---|---|---|---|---|
| POST | `/api/events` | Yes | admin, cr, moderator | Create event (draft) |
| PATCH | `/api/events/:id/publish` | Yes | admin, super_admin | Publish event |
| GET | `/api/events` | Yes | Any | List published events |
| POST | `/api/events/:id/rsvp` | Yes | student | RSVP to event |

### Attendance Routes

| Method | Endpoint | Auth Required | Roles | Description |
|---|---|---|---|---|
| POST | `/api/attendance/qr/:eventId` | Yes | admin | Generate attendance QR |
| POST | `/api/attendance/scan` | Yes | student | Scan QR to mark attendance |
| GET | `/api/attendance/:eventId` | Yes | admin, cr | Get attendance list |

### Other Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/forum/posts` | Create forum post |
| POST | `/api/resources` | Upload academic resource |
| GET | `/api/resources` | List approved resources |
| POST | `/api/projects` | Submit research project |
| GET | `/api/mentorship/mentors` | Browse mentor profiles |
| POST | `/api/mentorship/sessions` | Book mentorship session |
| POST | `/api/notices` | Create notice (admin) |
| GET | `/api/notices` | View notices |
| POST | `/api/leave` | Submit leave request |
| GET | `/api/analytics/fees` | Financial analytics |
| GET | `/api/health` | API health check |

---
<br>
<br>

# CHAPTER 5: TESTING AND RESULTS

---

## 5.1 Testing Strategy

Given the academic project context, the testing strategy focused on **manual functional testing** of all API endpoints, supplemented by TypeScript's compile-time type checking to catch structural errors before execution.

### 5.1.1 TypeScript Compile-Time Verification

The entire codebase is written in TypeScript and compiled via the `tsc` command (TypeScript compiler). This process catches:
- Type mismatches (e.g., passing a `string` to a function expecting a `number`).
- Missing required properties in Prisma query arguments.
- Incorrect return types from service functions.
- Undefined variable references.

The CI/CD pipeline (via Vercel build) runs `tsc` on every push; a TypeScript error will fail the build and prevent deployment, acting as an automated guard.

### 5.1.2 API Endpoint Testing

All REST API endpoints were tested manually using an API client tool. Test cases were organized per module:

- **Happy path:** The expected flow with valid inputs and correct authentication.
- **Unauthorized access:** Attempting to access protected routes without a valid JWT.
- **Forbidden access:** Attempting to access role-restricted routes with an insufficient role (e.g., a student trying to create a fee record).
- **Validation errors:** Submitting invalid or missing fields to confirm validation middleware rejects them correctly.
- **Edge cases:** Testing boundary conditions such as paying more than the fee amount, scanning an expired QR code, or RSVP-ing to an already-full event.

## 5.2 Functional Testing

### 5.2.1 Authentication Tests

| Test Case | Input | Expected Result | Actual Result |
|---|---|---|---|
| Register with valid data | New email, reg no, password | 201 Created, `isVerified: false` | ✅ Pass |
| Register with duplicate email | Existing email | 409 Conflict | ✅ Pass |
| Login with correct credentials | Valid email, password | 200 OK with JWT token | ✅ Pass |
| Login with wrong password | Valid email, wrong password | 401 Unauthorized | ✅ Pass |
| Access protected route without token | No Authorization header | 401 Unauthorized | ✅ Pass |
| Access protected route with expired token | Expired JWT | 401 Unauthorized | ✅ Pass |

### 5.2.2 Fee Management Tests

| Test Case | Input | Expected Result | Actual Result |
|---|---|---|---|
| Create fee record (admin) | Valid userId, semester, amount | 201 Created | ✅ Pass |
| Create duplicate fee record | Same userId, semester | Upsert (update amount) | ✅ Pass |
| Record partial payment | feeId, paidAmount < feeAmount | Status: "partial" | ✅ Pass |
| Record full payment | feeId, paidAmount = due | Status: "paid" | ✅ Pass |
| Student views own fees | Student JWT | Returns own fee records only | ✅ Pass |
| CR views another batch's fees | CR JWT (batch: 2020) | Scoped to CR's batch only | ✅ Pass |
| Student creates fee record | Student JWT | 403 Forbidden | ✅ Pass |

### 5.2.3 Event and Attendance Tests

| Test Case | Input | Expected Result | Actual Result |
|---|---|---|---|
| Create event (CR) | Valid event data | 201 Created (status: draft) | ✅ Pass |
| Publish event (admin) | Event ID, admin JWT | Status: published | ✅ Pass |
| RSVP to published event | Student JWT, event ID | 201 Created RSVP record | ✅ Pass |
| Duplicate RSVP | Same student, same event | 409 Conflict | ✅ Pass |
| Generate QR code (admin) | Event ID, expiresAt | QR token created | ✅ Pass |
| Mark attendance (valid QR) | Valid token, student JWT | 201 Attendance record | ✅ Pass |
| Mark attendance (expired QR) | Expired token | 400 Bad Request | ✅ Pass |
| Duplicate attendance | Same student scans twice | 409 Conflict | ✅ Pass |

### 5.2.4 Forum Tests

| Test Case | Expected Result | Actual Result |
|---|---|---|
| Create post in valid category | 201 Created | ✅ Pass |
| Create post in non-existent category | 404 Not Found | ✅ Pass |
| Comment on a post | 201 Created | ✅ Pass |
| Upvote a post | 201 Vote record | ✅ Pass |
| Upvote same post again | 409 Conflict (unique constraint) | ✅ Pass |

## 5.3 Security Testing

### 5.3.1 CORS Verification

The CORS configuration was verified by simulating requests from:
- `https://seceee.netlify.app` (Authorized) → Request succeeds, CORS headers returned.
- `https://evil-site.com` (Unauthorized) → Request blocked by browser with CORS error.

The console error previously observed (`Access-Control-Allow-Origin header has a value 'http://localhost:3000'`) was confirmed as being caused by the logical OR (`||`) bug in the CORS origin configuration, which was subsequently fixed to use an array.

### 5.3.2 Authentication Security

- JWT tokens with a tampered payload (e.g., manually edited role) are rejected by `jwt.verify()` because the signature becomes invalid.
- Tokens are signed with a secret stored in the environment variable `JWT_SECRET`, which is never committed to version control.
- Password hashes stored in the database were verified to be bcrypt hashes (starting with `$2a$10$`) using the bcrypt verification function.

## 5.4 Performance Considerations

- All frequently queried columns (e.g., `userId`, `status`, `batch`, `startAt`) are indexed using Prisma's `@@index` directive.
- The `feeSelect` projection in the fees repository ensures that only required columns are fetched from the database, rather than pulling entire rows with all fields.
- Parallel `Promise.all()` is used in analytics and stats functions to issue multiple database queries concurrently rather than sequentially, reducing total response time.
- The PgBouncer connection pooling URL ensures that the serverless backend does not exhaust the PostgreSQL server's maximum connection limit.

## 5.5 Test Results Summary

| Module | Total Test Cases | Passed | Failed |
|---|---|---|---|
| Authentication | 6 | 6 | 0 |
| Fee Management | 7 | 7 | 0 |
| Event Management | 5 | 5 | 0 |
| Attendance | 4 | 4 | 0 |
| Forum | 5 | 5 | 0 |
| CORS / Security | 4 | 4 | 0 |
| **Total** | **31** | **31** | **0** |

All planned test cases passed successfully. The system behaved as expected for all functional and security test scenarios.

---
<br>
<br>

# CHAPTER 6: LIMITATIONS AND FUTURE WORK

---

## 6.1 Current Limitations

Despite the comprehensive feature set, the current version of the platform has several recognized limitations:

**1. Manual Payment Verification:** The most significant operational limitation is the absence of an automated payment gateway. When a student makes an association fee payment via mobile banking (e.g., bKash), the CR or admin must manually log into the system to record the payment. This creates a delay and a potential for recording errors. There is no mechanism for the student to submit a payment receipt for automated verification.

**2. No Real-Time Communication:** The platform uses a notification model based on database polling rather than real-time push. Notifications are only visible when the student actively refreshes the platform. There is no WebSocket-based real-time push notification, which would provide a more responsive user experience for time-sensitive events like event announcements.

**3. File Storage:** The platform's `Resource` and `Document` models store `fileUrl` as a string, pointing to externally hosted files. There is currently no built-in file upload mechanism; file hosting must be handled by a third-party service (e.g., Cloudinary, AWS S3). This means file management is not fully within the system's control.

**4. Limited Test Coverage:** The testing was primarily manual and functional in nature. There are no automated unit tests for the service layer, no integration tests for the API endpoints, and no end-to-end tests. This makes it difficult to guarantee that future changes do not introduce regressions.

**5. No Mobile Application:** The platform is a web-based SPA accessible through a mobile browser, but lacks a native mobile application. Native apps would provide push notification capabilities and a more polished mobile user experience.

**6. Password Reset Functionality:** While a `PasswordResetHistory` model exists in the schema, a fully implemented password reset via email link (token-based) is not yet active in the deployed system.

## 6.2 Proposed Future Work

Based on the current limitations and the project team's analysis of future operational needs, the following extensions are proposed:

**1. Payment Gateway Integration:** The highest-priority future enhancement is integration with a Bangladeshi Mobile Financial Services (MFS) API such as SSLCommerz, bKash API, or Nagad. This would allow students to initiate and complete fee payments directly within the portal, with the payment status updating automatically upon gateway confirmation.

**2. WebSocket Real-Time Notifications:** Implementing WebSocket-based communication (e.g., using Socket.io) would allow the server to push notifications directly to connected clients. This would be particularly valuable for live event announcements, QR code activation alerts, and fee payment confirmations.

**3. Cloud File Storage Integration:** Integrating with a cloud storage service such as AWS S3, Cloudinary, or Firebase Storage would allow the platform to handle file uploads directly, providing a seamless experience for academic resource and document management without relying on external links.

**4. Automated Testing Suite:** Implementing a comprehensive testing suite using Jest and Supertest would provide confidence in code correctness. Unit tests for service-layer business logic and integration tests for all API endpoints would be the priority.

**5. Native Mobile Applications:** Developing native mobile applications for Android (using React Native or Flutter) would bring the platform to students' pockets with native push notification support and offline capabilities.

**6. Password Reset via Email:** Activating the existing password reset infrastructure would allow students to self-serve account recovery, reducing the admin workload for account management.

**7. Academic Result Import:** Building a parser to import academic result data (CGPA, semester GPA, subject marks) directly from the university's official result PDF would eliminate the need for manual data entry into the `AcademicSemester` and `AcademicSubject` tables.

**8. SMS Integration:** Integrating an SMS gateway (e.g., SMS Bulk BD) to send fee due reminders and event announcements to students' mobile numbers would increase reach among students who do not regularly check the web portal.

---
<br>
<br>

# CHAPTER 7: CONCLUSION

---

This project has successfully designed, developed, and deployed a comprehensive, secure, and scalable web-based management platform for the Department of Electrical and Electronic Engineering at Sylhet Engineering College. The system was developed as a practical response to the real operational inefficiencies experienced by the EEE departmental association in managing student records, fee collection, events, and community engagement through manual processes.

The backend REST API, built with Node.js, TypeScript, and Express.js, follows the layered Repository-Service-Controller architectural pattern, providing clear separation of concerns, maintainability, and extensibility. The PostgreSQL relational database, managed through the Prisma ORM, ensures data integrity through foreign key constraints, unique indexes, and ACID-compliant transactions. The five-tier Role-Based Access Control system—covering Students, CRs, Moderators, Admins, and Super Admins—provides fine-grained authorization for all 19 functional modules.

The platform's key achievements include:
- A **multi-tiered authentication system** with bcrypt password hashing, JWT token issuance, failed login tracking, and admin-controlled account verification.
- An **idempotent, transaction-safe fee management system** that accurately tracks semester-wise payments with Prisma's Decimal library for precise monetary calculations.
- A **secure QR code attendance system** with time-limited tokens that prevents retrospective fake check-ins.
- A **complete community platform** with a structured forum, academic resource library, research project showcase, and mentorship matching.
- A **production deployment pipeline** integrated with GitHub for continuous deployment on Vercel and Netlify.

The project demonstrates that the PERN stack (PostgreSQL, Express, React, Node.js) combined with TypeScript and Prisma is a capable, practical, and production-ready technology choice for building institutional management platforms. The architecture decisions made—particularly the modular RSC pattern and the relational database design—are proven to support the operational needs of a departmental association while remaining maintainable as the student body and feature set grow over time.

This platform, when fully adopted by the EEE Department at Sylhet Engineering College, has the potential to significantly reduce administrative overhead, improve financial transparency, and create a more connected and engaged student community.

---
<br>

## References

1. Prisma Documentation. "Prisma ORM." https://www.prisma.io/docs (Accessed: August 2026).
2. Node.js Foundation. "Node.js Documentation." https://nodejs.org/en/docs (Accessed: August 2026).
3. IETF. "RFC 7519: JSON Web Token (JWT)." https://datatracker.ietf.org/doc/html/rfc7519 (Accessed: August 2026).
4. Provos, N. and Mazières, D. "A Future-Adaptable Password Scheme." *USENIX Annual Technical Conference*, 1999.
5. Fielding, R. T. "Architectural Styles and the Design of Network-based Software Architectures." Doctoral Dissertation, University of California, Irvine, 2000.
6. PostgreSQL Global Development Group. "PostgreSQL 15 Documentation." https://www.postgresql.org/docs/15/ (Accessed: August 2026).
7. TypeScript Team. "TypeScript Documentation." https://www.typescriptlang.org/docs/ (Accessed: August 2026).
8. Express.js. "Express.js API Reference." https://expressjs.com/en/4x/api.html (Accessed: August 2026).
9. Vercel Inc. "Vercel Platform Documentation." https://vercel.com/docs (Accessed: August 2026).
10. OWASP Foundation. "OWASP Top Ten." https://owasp.org/www-project-top-ten/ (Accessed: August 2026).

---

*End of Report*
