from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.views.generic.simple import direct_to_template
from frontend.models import EmailEntry
from datetime import datetime

def index(request):
    if request.POST:
        form = EmailEntry.Form(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            EmailEntry.objects.get_or_create(email=email, date_added=datetime.now())
            form.clean()
            return direct_to_template(request, 'index.html', extra_context={
            'succes': True,
            })
        else:
            return direct_to_template(request, 'index.html', extra_context={
            'error': True, 'form': form,
            })
    else:
        form = EmailEntry.Form()
        return direct_to_template(request, 'index.html', extra_context={
            'form': form,
        })

