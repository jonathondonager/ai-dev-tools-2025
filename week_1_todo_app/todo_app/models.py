from django.db import models
from django.urls import reverse

class Todo(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateTimeField(blank=True, null=True)
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    # This method tells Django where to redirect after a successful create/update
    def get_absolute_url(self):
        return reverse('todo_list')