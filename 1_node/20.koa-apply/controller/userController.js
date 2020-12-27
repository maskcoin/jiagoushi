class UserController {
    async add(ctx, next) {
        await ctx.render('index.html', { name: 'zf', age: 11 })
    }

    async remove(ctx, next) {
        ctx.body = '用户删除'
    }
}

module.exports = UserController