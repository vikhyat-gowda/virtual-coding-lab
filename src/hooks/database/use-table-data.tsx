import { useEffect, useState } from 'react'
import { Supabase } from '../../supabase'
import { filterData } from '../../@types'

type eventType = 'INSERT' | 'UPDATE' | 'DELETE';

export const useTableData = (
    tableName: string,
    filterData?: filterData[],
    selectString = `*`,
    deps: any[] = [],
    filterListners?: eventType[],
) => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>()

    const fetchData = async () => {
        try {
            setLoading(true)
            const supabaseQuery = Supabase.from(tableName).select(selectString)

            if (filterData) {
                filterData.forEach((filter) => {
                    supabaseQuery.filter(
                        filter.columnName,
                        filter.operator,
                        filter.value,
                    )
                })
            }
            const { data, error } = await supabaseQuery
            if (error) throw error
            if (data) setData(data)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()

        const channel = Supabase.channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: tableName,
                },
                (payload) => {
                    if (filterListners) {
                        if (filterListners.includes(payload.eventType)) {
                            fetchData()
                        }
                    } else fetchData()
                },
            )
            .subscribe()
        console.log('hjere')

        return () => {
            channel.unsubscribe()
        }
    }, [...deps])

    useEffect(() => {
        console.log('[useTableData]::table:', tableName, data)
    }, [data])

    return [data, loading, error, fetchData]
}
