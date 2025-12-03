from django.test import TestCase
from django.utils import timezone
from .models import Todo
from datetime import timedelta

class TodoModelTest(TestCase):
    def test_todo_creation(self):
        todo = Todo.objects.create(title="Test Todo")
        self.assertEqual(todo.title, "Test Todo")
        self.assertFalse(todo.is_resolved)
        self.assertIsInstance(todo.created_at, timezone.datetime)

    def test_string_representation(self):
        todo = Todo(title="My Task")
        self.assertEqual(str(todo), "My Task")

    def test_is_resolved_default(self):
        todo = Todo.objects.create(title="Unresolved Task")
        self.assertFalse(todo.is_resolved)
        todo.is_resolved = True
        todo.save()
        self.assertTrue(todo.is_resolved)

    def test_due_date_handling(self):
        due = timezone.now() + timedelta(days=1)
        todo = Todo.objects.create(title="Due Task", due_date=due)
        self.assertEqual(todo.due_date, due)
