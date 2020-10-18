module.exports = function convertPageToLimitOffset(page, pageSize) {
    if (page < 0 || pageSize < 0) {
        return {
            limit: 0,
            offset: 0
        }
    }
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    return {limit, offset}
}