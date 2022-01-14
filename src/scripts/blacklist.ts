const checkBlacklist = (query: string, blackList: Set<string>): boolean => {
    return query in blackList;
}

export default checkBlacklist