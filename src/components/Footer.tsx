export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">极</span>
              </div>
              <span className="text-white font-bold text-xl">极光视频</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              提供海量高清影视内容，打造极致观影体验。
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">内容分类</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div>电影</div>
              <div>电视剧</div>
              <div>动漫</div>
              <div>综艺</div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">服务支持</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div>帮助中心</div>
              <div>会员服务</div>
              <div>意见反馈</div>
              <div>联系客服</div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">关于我们</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div>公司介绍</div>
              <div>联系我们</div>
              <div>隐私政策</div>
              <div>用户协议</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>© 2024 极光视频. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}
