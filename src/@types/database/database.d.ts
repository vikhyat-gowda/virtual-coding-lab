export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            lab_announcement: {
                Row: {
                    created_at: string | null;
                    message: string | null;
                    session_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    message?: string | null;
                    session_id: string;
                };
                Update: {
                    created_at?: string | null;
                    message?: string | null;
                    session_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'lab_announcement_session_id_fkey';
                        columns: ['session_id'];
                        referencedRelation: 'lab_sessions';
                        referencedColumns: ['session_id'];
                    }
                ];
            };
            lab_chats: {
                Row: {
                    chat_id: string;
                    created_at: string | null;
                    message: string | null;
                    participant_id: string;
                    teacher_id: string | null;
                };
                Insert: {
                    chat_id?: string;
                    created_at?: string | null;
                    message?: string | null;
                    participant_id: string;
                    teacher_id?: string | null;
                };
                Update: {
                    chat_id?: string;
                    created_at?: string | null;
                    message?: string | null;
                    participant_id?: string;
                    teacher_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'lab_chats_participant_id_fkey';
                        columns: ['participant_id'];
                        referencedRelation: 'lab_participants';
                        referencedColumns: ['participant_id'];
                    },
                    {
                        foreignKeyName: 'lab_chats_teacher_id_fkey';
                        columns: ['teacher_id'];
                        referencedRelation: 'teachers';
                        referencedColumns: ['teacher_id'];
                    }
                ];
            };
            lab_codes: {
                Row: {
                    code: string | null;
                    code_id: string;
                    created_at: string | null;
                    is_submited: boolean;
                    participant_id: string | null;
                };
                Insert: {
                    code?: string | null;
                    code_id: string;
                    created_at?: string | null;
                    is_submited?: boolean;
                    participant_id?: string | null;
                };
                Update: {
                    code?: string | null;
                    code_id?: string;
                    created_at?: string | null;
                    is_submited?: boolean;
                    participant_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'lab_codes_participant_id_fkey';
                        columns: ['participant_id'];
                        referencedRelation: 'lab_participants';
                        referencedColumns: ['participant_id'];
                    }
                ];
            };
            lab_participants: {
                Row: {
                    participant_id: string;
                    session_id: string | null;
                    student_id: string | null;
                };
                Insert: {
                    participant_id?: string;
                    session_id?: string | null;
                    student_id?: string | null;
                };
                Update: {
                    participant_id?: string;
                    session_id?: string | null;
                    student_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'lab_participants_session_id_fkey';
                        columns: ['session_id'];
                        referencedRelation: 'lab_sessions';
                        referencedColumns: ['session_id'];
                    },
                    {
                        foreignKeyName: 'lab_participants_student_id_fkey';
                        columns: ['student_id'];
                        referencedRelation: 'students';
                        referencedColumns: ['student_id'];
                    }
                ];
            };
            lab_sessions: {
                Row: {
                    created_at: string | null;
                    description: string | null;
                    name: string | null;
                    session_id: string;
                    status: string | null;
                    teacher_id: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    description?: string | null;
                    name?: string | null;
                    session_id?: string;
                    status?: string | null;
                    teacher_id?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    description?: string | null;
                    name?: string | null;
                    session_id?: string;
                    status?: string | null;
                    teacher_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'lab_sessions_teacher_id_fkey';
                        columns: ['teacher_id'];
                        referencedRelation: 'teachers';
                        referencedColumns: ['teacher_id'];
                    }
                ];
            };
            students: {
                Row: {
                    email: string;
                    name: string;
                    student_id: string;
                    usn: string | null;
                };
                Insert: {
                    email?: string;
                    name?: string;
                    student_id: string;
                    usn?: string | null;
                };
                Update: {
                    email?: string;
                    name?: string;
                    student_id?: string;
                    usn?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'students_student_id_fkey';
                        columns: ['student_id'];
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    }
                ];
            };
            teachers: {
                Row: {
                    email: string;
                    name: string;
                    teacher_id: string;
                };
                Insert: {
                    email?: string;
                    name?: string;
                    teacher_id: string;
                };
                Update: {
                    email?: string;
                    name?: string;
                    teacher_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'teachers_teacher_id_fkey';
                        columns: ['teacher_id'];
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
