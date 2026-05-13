import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-900/80 border-t border-gray-800 py-10">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            极光视频
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            为您提供高清、流畅的视频播放体验，海量内容随心看。
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
              文
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
              博
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
              B
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">产品服务</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">VIP会员</a></li>
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">极光TV</a></li>
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">视频彩铃</a></li>
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">极光云游戏</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">帮助中心</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">会员服务</a></li>
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">使用帮助</a></li>
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">意见反馈</a></li>
            <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">投诉举报</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">下载APP</h4>
          <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded flex items-center justify-center text-gray-800 text-sm">
              二维码
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2 text-center">扫码下载APP</p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-xs">
          <a href="#" className="hover:text-gray-400 transition-colors">用户协议</a>
          <a href="#" className="hover:text-gray-400 transition-colors">隐私政策</a>
          <a href="#" className="hover:text-gray-400 transition-colors">版权声明</a>
          <a href="#" className="hover:text-gray-400 transition-colors">反盗版与盗链声明</a>
          <a href="#" className="hover:text-gray-400 transition-colors">未成年人用户协议</a>
        </div>
        <p className="text-gray-600 text-xs">
          © 2025 极光视频 版权所有 | 京ICP备XXXXXXXX号
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;