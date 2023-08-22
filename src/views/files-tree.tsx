import clsx from 'clsx'
import { useTableData } from '../hooks'

type FileTreeProps = {
    participentId: string;
    setActiveCodeId: (id: string) => void;
    activeCodeId: string;
};

const FileTree = ({
                      participentId,
                      setActiveCodeId,
                      activeCodeId,
                  }: FileTreeProps) => {
    const [fileList] = useTableData(
        'lab_codes',
        [
            {
                columnName: 'participant_id',
                operator: 'eq',
                value: participentId,
            },
        ],
        '*',
        [],
        ['INSERT', 'DELETE'],
    )

    return (
        <ul className='my-2 text-sm font-sans '>
            {fileList
                ? fileList.map((file: any) => {
                    return (
                        <li
                            key={file.code_id}
                            onClick={() => setActiveCodeId(file.code_id)}
                            className={clsx(
                                'hover:bg-zinc-300 p-2 rounded-md select-none',
                                file.code_id === activeCodeId && 'bg-green-400/50',
                            )}
                        >
                            {file.name}
                        </li>
                    )
                })
                : 'Loading'}
        </ul>
    )
}

export default FileTree
