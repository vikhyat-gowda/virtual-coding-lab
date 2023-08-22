# Virtual Coding Lab

Welcome to the Virtual Coding Lab repository! This project was developed as part of a software engineering assignment. The Virtual Coding Lab provides an interactive platform for students and teachers to collaborate on
coding exercises and projects in a virtual lab environment. With features like instant lab creation, one-to-one
communication, live code preview, multi-language code compilation, and more, this platform aims to enhance the coding
learning experience.

## Features

- **Instant Lab Creation**: Teachers can create coding labs instantly and generate a unique link to share with students.

- **Student Enrollment**: Students can join the lab by clicking on the shared link, allowing for easy and quick access.

- **One-to-One Communication**: Students can communicate directly with the teacher, clarifying doubts and seeking
  guidance.

- **Announcement Channel**: Important notifications can be broadcasted to all lab students via the announcement channel.

- **Live Code Preview**: The platform provides a real-time preview of the code students are writing, facilitating
  immediate feedback.

- **Multi-Language Support**: Students can write code in over 20 programming languages, and the system supports
  compilation and execution.

- **Multiple Files**: Students can create and manage multiple files within the platform to work on different programs
  simultaneously.

- **Custom Inputs**: The platform allows students to input custom test cases to validate and test their programs.

## How to Use

1. Educators can sign up and create a lab for their class.
2. Students receive an invitation link to join the lab.
3. Inside the lab, students can code, communicate with their teachers, and receive important announcements.
4. The live preview feature helps students visualize their code as they write.
5. Students can compile and execute their code in various languages.
6. Custom inputs can be provided to thoroughly test the code's functionality.

## Tech Stack

- **Frontend**: This project utilizes React for the frontend interface, providing a smooth and responsive user
  experience.

- **Backend**: Supabase is used for the backend, handling user authentication, lab creation, and communication between
  students and teachers.

- **Code Compilation and Execution**: Judge0 is integrated into the platform for compiling and executing code written by
  students in various programming languages.

## Getting Started

To set up the Virtual Coding Lab on your local environment, follow these steps:

1. Clone the repository:

  ```bash
  git clone https://github.com/your-username/virtual-coding-lab.git
  cd virtual-coding-lab
  ```

2. Install dependencies and start the development server:

  ```bash
  npm install
  npm run dev
  ```

3. Set up the Supabase config:

- Create a Supabase project at [https://supabase.io](https://supabase.io) and retrieve your project URL and API key.

- In `config.ts` file in the `src\supbase\` directory and add your Supabase project URL and API key:

   ```env
   SUPABASEURL=your-supabase-url
   SUPABASEKEY=your-supabase-api-key
   ```
  > **_NOTE:_** Use .env file if you are planning to host

4. Set up the Judge0 API:

- Signup at Judge0 API at [here](https://rapidapi.com/judge0-official/api/judge0-ce) and retrieve your API key and API
  host.

- In `judge0-config.ts` file in the `src\api\` directory and add your Judge0 API key and API host:

   ```env
   RAPID_API_KEY=your-judge0-api-key
   RAPID_API_HOST=your-judge0-api-host
   ```
  > **_NOTE:_** Use .env file if you are planning to host

4. Config Supabase project

- Enable supabbase email-auth
- Create database same as below image
  ![Supabase-Schema](/installation-guide/Supbase%20Schema.png)
- The `table-interface.ts` file contains interface for all tables
  > **_NOTE:_**  If the live update are not working, enable realtime option for the tables.
- You can run the below sql query to generate the database
  ```
    create table teachers (
      teacher_id uuid default uuid_generate_v4() primary key,
      name text not null,
      email text not null
    );
  
    create table lab_sessions (
      session_id uuid default uuid_generate_v4() primary key,
      created_at timestamp default now(),
      teacher_id uuid references teachers (teacher_id),
      name text,
      description text,
      status text
    );
  
    create table lab_announcement (
      session_id uuid references lab_sessions (session_id),
      created_at timestamp default now(),
      message text,
      chat_id uuid default uuid_generate_v4() primary key
    );
  
    create table students (
      student_id uuid default uuid_generate_v4() primary key,
      name text not null,
      email text not null,
      usn text
    );
  
    create table lab_participants (
      participant_id uuid default uuid_generate_v4() primary key,
      student_id uuid references students (student_id),
      session_id uuid references lab_sessions (session_id)
    );
  
    create table lab_chats (
      participant_id uuid references lab_participants (participant_id),
      created_at timestamp default now(),
      message text,
      chat_id uuid default uuid_generate_v4() primary key,
      session_id uuid references lab_sessions (session_id),
      fromStudent boolean
    );
  
    create table lab_codes (
      code_id uuid default uuid_generate_v4() primary key,
      created_at timestamp default now(),
      participant_id uuid,
      code text,
      is_submited boolean not null,
      lang_key integer,
      student_id uuid references students (student_id),
      session_id uuid references lab_sessions (session_id),
      name text
    );
  ```

The Virtual Coding Lab should now be up and running on your local machine.

## Contributing

We welcome contributions from the community! If you find any issues or have ideas for improvements, please feel free to
open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to explore the code and experiment with the Virtual Coding Lab. Happy coding!