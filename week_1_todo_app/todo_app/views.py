from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Todo

# 1. List all Todos
class TodoListView(ListView):
    model = Todo
    template_name = 'todo_app/todo_list.html'
    context_object_name = 'todos'
    ordering = ['is_resolved', 'due_date'] # Show unresolved first, then by date

# 2. Create a new Todo
class TodoCreateView(CreateView):
    model = Todo
    template_name = 'todo_app/todo_form.html'
    fields = ['title', 'description', 'due_date']

# 3. Update an existing Todo (Edit or Mark Resolved)
class TodoUpdateView(UpdateView):
    model = Todo
    template_name = 'todo_app/todo_form.html'
    fields = ['title', 'description', 'due_date', 'is_resolved']

# 4. Delete a Todo
class TodoDeleteView(DeleteView):
    model = Todo
    template_name = 'todo_app/todo_confirm_delete.html'
    success_url = reverse_lazy('todo_list')