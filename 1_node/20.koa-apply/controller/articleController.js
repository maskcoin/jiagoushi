class AriticleController {
    async add(ctx, next) {
        ctx.body = '文章添加'
    }

    async remove(ctx, next) {
        ctx.body = '文章删除'
    }
}

module.exports = AriticleController