interface Teachers {
    teacher_id: string   /* primary key */
    ;
    name: string;
    email: string;
}

interface Lab_sessions {
    session_id: string   /* primary key */
    ;
    created_at?: string;
    teacher_id?: string   /* foreign key to teachers.teacher_id */
    ;
    name?: string;
    description?: string;
    status?: string;
    teachers?: Teachers;
}

interface Lab_announcement {
    session_id: string   /* foreign key to lab_sessions.session_id */
    ;
    created_at?: string;
    message?: string;
    chat_id: string   /* primary key */
    ;
    lab_sessions?: Lab_sessions;
}

interface Students {
    student_id: string   /* primary key */
    ;
    name: string;
    email: string;
    usn?: string;
}

interface Lab_participants {
    participant_id: string   /* primary key */
    ;
    student_id: string   /* foreign key to students.student_id */
    ;
    session_id: string   /* foreign key to lab_sessions.session_id */
    ;
    students?: Students;
    lab_sessions?: Lab_sessions;
}

interface Lab_chats {
    participant_id: string   /* foreign key to lab_participants.participant_id */
    ;
    created_at?: string;
    message?: string;
    chat_id: string   /* primary key */
    ;
    session_id?: string   /* foreign key to lab_sessions.session_id */
    ;
    fromStudent?: boolean;
    lab_participants?: Lab_participants;
    lab_sessions?: Lab_sessions;
}

interface Lab_codes {
    code_id: string   /* primary key */
    ;
    created_at?: string;
    participant_id?: string;
    code?: string;
    is_submited: boolean;
    lang_key?: number;
    student_id?: string   /* foreign key to students.student_id */
    ;
    session_id?: string   /* foreign key to lab_sessions.session_id */
    ;
    name?: string;
    students?: Students;
    lab_sessions?: Lab_sessions;
}

