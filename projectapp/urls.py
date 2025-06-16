from django.urls import path
from . import views


app_name = "projectapp"


urlpatterns = [
    path('', views.home, name='home'),
    path('our-works', views.ourWorks, name='ourWorks'),
    path('services/', views.services, name="services"),
    path('presentation-design/',  views.presentation_design, name="presentation_design"),
    path('graphics-print-design/',  views.graphics, name="graphics"),
    path('other-services/',  views.otherServices, name="otherServices"),
    path('solutions/', views.solutions, name="solutions"),
    path('testimonials/', views.testimonials, name="testimonials"),
    path('pricing/', views.pricing, name="pricing"),

    path('faq-list/', views.faq_list, name='faq_list'),

    path('order-flow/', views.orderFlow, name='orderFlow'),

    path("submit_order/", views.submit_order, name="submit_order"),

    path('enquire-now/', views.enquireNow, name="enquireNow"),

    path('order-now/', views.orderNow, name='orderNow'),

    path('order/', views.order, name='order'),

]