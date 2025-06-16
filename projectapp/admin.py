from django.contrib import admin
from .models import FAQ, Testimonials, Order, Work
# Register your models here.


@admin.register(FAQ)
class FAQadmin(admin.ModelAdmin):
    list_display = ('question', 'created_at')
    ordering = ('-created_at',)

@admin.register(Testimonials)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'trustpilot_url')
    list_filter = ('date',)
    search_fields = ('name', 'content')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "delivery_date", "created_at")
    readonly_fields = ("created_at",)


@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('title',)