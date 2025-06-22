
import React from 'react';
import { ArrowRight, CheckCircle, BarChart3, Target, Calendar, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Ahmet Kaya",
      role: "Fitness Antrenörü",
      avatar: "AK",
      content: "Bu uygulama sayesinde müşterilerimin gelişimini daha kolay takip edebiliyorum. Harika bir araç!",
      rating: 5
    },
    {
      name: "Ayşe Demir",
      role: "Yazılım Geliştirici",
      avatar: "AD",
      content: "Bootcamp derslerimi ve spor programımı organize etmek hiç bu kadar kolay olmamıştı.",
      rating: 5
    },
    {
      name: "Mehmet Özkan",
      role: "Öğrenci",
      avatar: "MÖ",
      content: "TransferPlus çalışma saatlerimi takip ederek hedeflerime ulaşmamda çok yardımcı oldu.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full animate-float blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-full animate-float blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                Goal Compass
              </span>
              <br />
              <span className="text-gray-200">Daily</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Spor, Bootcamp ve TransferPlus aktivitelerinizi takip edin. 
              Hedeflerinize ulaşmanın yolunu keşfedin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Hemen Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300"
              >
                Demo İzle
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 animate-slide-up">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Hedef Takibi</h3>
                  <p className="text-gray-300">Günlük hedeflerinizi belirleyin ve ilerlemenizi takip edin</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">İstatistik Analizi</h3>
                  <p className="text-gray-300">Detaylı grafiklerle gelişiminizi analiz edin</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <CardContent className="p-6 text-center">
                  <div className="bg-teal-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Offline Destek</h3>
                  <p className="text-gray-300">İnternet olmasa bile verileriniz güvende</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Neden <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Goal Compass?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern teknoloji ile tasarlanmış, kullanıcı dostu arayüzü sayesinde hedeflerinize ulaşmak hiç bu kadar kolay olmamıştı.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: "Günlük Takip", desc: "Günlük aktivitelerinizi kolayca kaydedin" },
              { icon: BarChart3, title: "Analitik", desc: "Gelişiminizi grafiklerle görselleştirin" },
              { icon: Target, title: "Hedefler", desc: "Kişisel hedeflerinizi belirleyin" },
              { icon: CheckCircle, title: "Motivasyon", desc: "Başarılarınızla motive olun" }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/10">
                  <feature.icon className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Kullanıcılarımız <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Ne Diyor?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 backdrop-blur-sm border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hedeflerinize <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Başlayın!</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Bugün başlayın ve hedeflerinize ulaşma yolculuğunuzda Goal Compass'ın size nasıl yardımcı olabileceğini keşfedin.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
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
    </div>
  );
};

export default Landing;
