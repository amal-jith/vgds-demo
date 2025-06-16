import json
from django.views.decorators.csrf import csrf_exempt

from django.http import JsonResponse
from django.core.paginator import Paginator

from django.shortcuts import render
from .models import FAQ, Testimonials, Order, Work
from django.core.files.base import ContentFile

from django.core.mail import send_mail
from django.shortcuts import redirect
from django.contrib import messages
from django.conf import settings
from django.template.loader import render_to_string



# Create your views here.


def home(request):

    faqs = FAQ.objects.all()[:5]
    testimonials = Testimonials.objects.order_by('-date')[:3]

    context = {
        "faqs":faqs,
        "testimonials": testimonials,
    }

    return render(request, "home.html", context)

def ourWorks(request):

    works = Work.objects.all()

    context = {
        "works": works,
    }
    return render(request, "our-works.html", context)

def faq_list(request):
    page = int(request.GET.get('page', 1))
    per_page = 5
    faqs = FAQ.objects.all()
    paginator = Paginator(faqs, per_page)

    if page > paginator.num_pages:
        return JsonResponse({'faqs': [], 'has_next': False})

    current_page = paginator.page(page)
    data = [
        {
            'question': faq.question,
            'answer': faq.answer,
        }
        for faq in current_page
    ]

    return JsonResponse({'faqs': data, 'has_next': current_page.has_next()})

def services(request):
    return render(request, "services.html")

def presentation_design(request):

    faqs = FAQ.objects.all()[:5]

    context = {
        "faqs": faqs,
    }

    return render(request, "presentation-design.html", context)

def graphics(request):

    faqs = FAQ.objects.all()[:5]

    context = {
        "faqs": faqs,
    }

    return render(request, "graphics.html", context)

def otherServices(request):

    faqs = FAQ.objects.all()[:5]

    context = {
        "faqs": faqs,
    }

    return render(request, "other-services.html", context)


def solutions(request):
    return render(request, "solutions.html")

def testimonials(request):

    testimonials = Testimonials.objects.all()

    context = {
        "testimonials": testimonials
    }
    return render(request, "testimonials.html", context)

def pricing(request):
    return render(request, "pricing.html")

def orderFlow(request):
    return render(request, "order-flow.html")


@csrf_exempt
def submit_order(request):
    if request.method == "POST":
        try:
            # Get JSON application data
            application_data = json.loads(request.POST.get("application", "{}"))

            # Get individual sections
            treatment = application_data.get("treatment", {})
            style = application_data.get("style", {})
            delivery = application_data.get("delivery", {})
            filesDetails = application_data.get("filesDetails", {})
            payment = application_data.get("payment", {})

            # Create new Order object (adjust field names as per your model)
            order = Order.objects.create(
                treatment_name=treatment.get("name"),
                treatment_price=treatment.get("price"),

                style_name=style.get("name"),
                delivery_date=delivery.get("date"),
                delivery_rate=delivery.get("rate"),
                delivery_slides=delivery.get("slides"),
                delivery_option=delivery.get("option"),
                delivery_option_price=delivery.get("optionPrice"),
                estimated_price_range=delivery.get("estimatedText"),

                full_name=payment.get("fullName"),
                email=payment.get("email"),
                phone=payment.get("phone"),
                promo_code=payment.get("promoCode"),
                agreed_to_terms=payment.get("agreedToTerms"),
                marketing_opt_in=payment.get("receiveMarketingEmails"),
                google_link=request.POST.get("google_link"),
                google_checkbox=filesDetails.get("checkboxChecked", False),
            )

            # Handle uploaded files
            style_file = request.FILES.get("style_file")
            if style_file:
                order.style_file.save(style_file.name, style_file)

            presentation_file = request.FILES.get("presentation_file")
            if presentation_file:
                order.presentation_file.save(presentation_file.name, presentation_file)

            order.save()

            # Send admin mail
            email_subject = "New Presentation Order Received"
            email_recipients = ["amajith.work@gmail.com"]  # could also be [order.email] to notify the customer
            email_context = {
                "order": order
            }

            # Create HTML email content using a template
            email_body = render_to_string("emails/order_summary.html", email_context)

            send_mail(
                subject=email_subject,
                message="This is a fallback plain-text message.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=email_recipients,
                html_message=email_body
            )

            #  Send customer confirmation email
            customer_subject = "Thanks for your order! 🎉"
            customer_body = render_to_string("emails/customer_confirmation.html", {"order": order})

            send_mail(
                subject=customer_subject,
                message="Thank you for your presentation order!",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[order.email],
                html_message=customer_body
            )

            return JsonResponse({"status": "success"})

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse({"status": "invalid request"}, status=405)








def enquireNow(request):
    if request.method == "POST":
        message_name = request.POST['enquiryFullName']
        message_mob = request.POST['enquiryPhone']
        message_email = request.POST['enquiryEmail']
        message = request.POST['message']

        email_message = f'''
        Full Name: {message_name}
        Mobile Number: {message_mob}
        Email: {message_email}
        Message: {message}
        '''

        # Send the email
        send_mail(
            'Enquiry Mail',
            email_message,
            settings.DEFAULT_FROM_EMAIL,
            ['amaljith.work@gmail.com'],
            fail_silently=False,
        )
        messages.add_message(request, messages.SUCCESS, 'Your enquiry request has been sent successfully!')
        return redirect('projectapp:home')

    return redirect('projectapp:home')









def orderNow(request):
    return render(request, "order-modal.html")

def order(request):
    return render(request, "order-now.html")