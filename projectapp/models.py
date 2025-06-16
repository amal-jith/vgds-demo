from django.db import models

# Create your models here.

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.question


class Testimonials(models.Model):
    name = models.CharField(max_length=100)
    profile_image = models.ImageField(upload_to='testimonials/profile_images/')
    date = models.DateField()
    content = models.TextField()
    trustpilot_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.date.strftime('%d %b %Y')}"




class Order(models.Model):
    # Step 1 - Treatment
    treatment_name = models.CharField(max_length=100, blank=True, null=True)
    treatment_price = models.CharField(max_length=50, blank=True, null=True)

    # Step 2 - Style
    style_name = models.CharField(max_length=100, blank=True, null=True)
    style_file = models.FileField(upload_to="style_files/", blank=True, null=True)

    # Step 3 - Delivery
    delivery_date = models.CharField(max_length=20, blank=True, null=True)
    delivery_rate = models.CharField(max_length=100, blank=True, null=True)
    delivery_slides = models.IntegerField(default=1)
    delivery_option = models.CharField(max_length=100, blank=True, null=True)
    delivery_option_price = models.FloatField(default=0)
    estimated_price_range = models.CharField(max_length=100, blank=True, null=True)

    # Step 4 - Files
    google_checkbox = models.BooleanField(default=False)
    google_link = models.TextField(blank=True, null=True)
    presentation_file = models.FileField(upload_to="presentations/", blank=True, null=True)

    # Step 5 - Payment
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    promo_code = models.CharField(max_length=100, blank=True, null=True)
    agreed_to_terms = models.BooleanField(default=False)
    marketing_opt_in = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.full_name} - {self.created_at.strftime('%Y-%m-%d')}"





# Predefined categories to match your buttons
CATEGORY_CHOICES = [
    ('brandingTemplates', 'Branding Templates'),
    ('brochure', 'Brochure'),
    ('businessPresentation', 'Business Presentation'),
    ('companyProfile', 'Company Profile'),
    ('flyer', 'Flyer'),
    ('graphicDesign', 'Graphic Design'),
    ('pitchDeckDesign', 'Pitch Deck Design'),
    ('powerpoint', 'PowerPoint'),
    ('salesDesign', 'Sales Design'),
]


class Work(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='portfolio/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title