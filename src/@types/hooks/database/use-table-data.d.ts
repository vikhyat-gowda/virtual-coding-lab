export type filterData = {
    columnName: string;
    operator:
        | 'eq'
        | 'neq'
        | 'gt'
        | 'gte'
        | 'lt'
        | 'lte'
        | 'like'
        | 'ilike'
        | 'is'
        | 'in'
        | 'cs'
        | 'cd'
        | 'sl'
        | 'sr'
        | 'nxl'
        | 'nxr'
        | 'adj'
        | 'ov'
        | 'fts'
        | 'plfts'
        | 'phfts'
        | 'wfts';
    value: string;
};
