import React from 'react';
import { ArrowRight, CheckCircle, BarChart3, Target, Calendar, Zap, Star, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Landing = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const testimonials = [{
    name: "Ahmet Kaya",
    role: "Fitness Antrenörü",
    avatar: "AK",
    content: "Bu uygulama sayesinde müşterilerimin gelişimini daha kolay takip edebiliyorum. Harika bir araç!",
    rating: 5
  }, {
    name: "Ayşe Demir",
    role: "Yazılım Geliştirici",
    avatar: "AD",
    content: "Bootcamp derslerimi ve spor programımı organize etmek hiç bu kadar kolay olmamıştı.",
    rating: 5
  }, {
    name: "Mehmet Özkan",
    role: "Öğrenci",
    avatar: "MÖ",
    content: "TransferPlus çalışma saatlerimi takip ederek hedeflerime ulaşmamda çok yardımcı oldu.",
    rating: 5
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full animate-float blur-3xl" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full animate-float blur-3xl" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rocket */}
        <div className="absolute top-32 left-16 animate-float text-4xl opacity-80" style={{
        animationDelay: '0s'
      }}>
          🚀
        </div>
        {/* Chart */}
        <div className="absolute top-48 right-20 animate-float text-4xl opacity-80" style={{
        animationDelay: '1s'
      }}>
          📊
        </div>
        {/* Document */}
        <div className="absolute bottom-32 left-20 animate-float text-4xl opacity-80" style={{
        animationDelay: '2s'
      }}>
          📋
        </div>
        {/* Star */}
        <div className="absolute top-64 right-32 animate-float text-3xl opacity-70" style={{
        animationDelay: '0.5s'
      }}>
          ⭐
        </div>
        {/* Target */}
        <div className="absolute bottom-48 right-16 animate-float text-3xl opacity-70" style={{
        animationDelay: '1.5s'
      }}>
          🎯
        </div>
        {/* Trophy */}
        <div className="absolute top-96 left-32 animate-float text-3xl opacity-70" style={{
        animationDelay: '2.5s'
      }}>
          🏆
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Goal Compass
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Özellikler</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Yorumlar</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Fiyatlar</a>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Giriş Yap
            </Button>
            <Button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Ücretsiz Başla
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 px-4 py-6">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Özellikler</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Yorumlar</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Fiyatlar</a>
              <Button variant="ghost" className="text-gray-300 hover:text-white justify-start">
                Giriş Yap
              </Button>
              <Button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Ücretsiz Başla
              </Button>
            </div>
          </div>}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 py-[61px]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in py-0 my-0 mt--10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-400/30 rounded-full px-4 py-2 mb-8">
              <Star className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Hedeflerinizi Gerçeğe Dönüştürün</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                Goal Compass
              </span>
              <br />
              <span className="text-gray-200">Daily</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Spor, Bootcamp ve TransferPlus aktivitelerinizi takip edin. 
              Hedeflerinize ulaşmanın yolunu keşfedin ve motivasyonunuzu artırın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
                Hemen Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300 w-full sm:w-auto">
                Demo İzle
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">95%</div>
                <p className="text-gray-400 text-sm sm:text-base">Hedef Başarı Oranı</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">10x</div>
                <p className="text-gray-400 text-sm sm:text-base">Daha Hızlı İlerleme</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">1</div>
                <p className="text-gray-400 text-sm sm:text-base">Hedef Netliği</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2">100%</div>
                <p className="text-gray-400 text-sm sm:text-base">Kullanıcı Memnuniyeti</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Neden <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Goal Compass?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Modern teknoloji ile tasarlanmış, kullanıcı dostu arayüzü sayesinde hedeflerinize ulaşmak hiç bu kadar kolay olmamıştı.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            icon: Calendar,
            title: "Günlük Takip",
            desc: "Günlük aktivitelerinizi kolayca kaydedin"
          }, {
            icon: BarChart3,
            title: "Analitik",
            desc: "Gelişiminizi grafiklerle görselleştirin"
          }, {
            icon: Target,
            title: "Hedefler",
            desc: "Kişisel hedeflerinizi belirleyin"
          }, {
            icon: CheckCircle,
            title: "Motivasyon",
            desc: "Başarılarınızla motive olun"
          }].map((feature, index) => <div key={index} className="text-center animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10 hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Kullanıcılarımız <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Ne Diyor?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className={`bg-white/10 backdrop-blur-sm border-white/20 transition-all duration-500 cursor-pointer group
                  ${index % 3 === 0 ? 'rotate-1 hover:rotate-0' : index % 3 === 1 ? '-rotate-1 hover:rotate-0' : 'rotate-2 hover:rotate-0'} 
                  hover:bg-white/15 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 animate-slide-up`} style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  
                  <p className="text-gray-300 italic leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 sm:p-16 backdrop-blur-sm border border-white/20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
              Hedeflerinize <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Başlayın!</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Bugün başlayın ve hedeflerinize ulaşma yolculuğunuzda Goal Compass'ın size nasıl yardımcı olabileceğini keşfedin.
            </p>
            <Button onClick={() => navigate('/dashboard')} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl">
              Ücretsiz Başla
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Goal Compass Daily. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>;
};
export default Landing;