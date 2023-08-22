import { Supabase } from '../../supabase'
import { useState } from 'react'
import { errorToast, successToast } from '../../utils'

export const useTableDelete = (
    tableName: string,
    successMessage = 'success',
) => {
    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const deleteRow = async (primaryKeyName: string, primaryKeyValue: string) => {
        try {
            console.log('function called')
            setLoading(true)
            const { error } = await Supabase.from(tableName)
                .delete()
                .eq(primaryKeyName, primaryKeyValue)
            if (error) throw error
            console.log('function called11')
            setLoading(false)
            successToast(successMessage)
        } catch (error: any) {
            errorToast(error?.message)
            console.error(error)
            setError(error)
            setLoading(false)
        }
    }

    return [deleteRow, loading, error]
}
