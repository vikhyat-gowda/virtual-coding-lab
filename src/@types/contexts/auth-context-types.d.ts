import { User } from '@supabase/supabase-js'
import { Roles } from '../../constants'

export type AuthContextType = {
    role?: Roles | null;
    user?: User | null;
};
