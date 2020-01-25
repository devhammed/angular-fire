import { Component, OnInit } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Task, TaskWithID } from './models/Task'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  task: string
  editingID: string
  editingName: string
  todos: Observable<TaskWithID[]>
  private collectionName = 'todos'
  private todosCollection: AngularFirestoreCollection<Task>

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.todosCollection = this.afs.collection<Task>(this.collectionName)
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(action => {
          const id = action.payload.doc.id
          const data = action.payload.doc.data() as Task
          return { id, ...data }
        })
      )
    )
  }

  addTodo() {
    if (!this.task) {
      return
    }

    this.todosCollection.add({
      name: this.task,
      completed: false
    })

    this.task = ''
  }

  updateTodo() {
    this.afs.doc<Task>(`${this.collectionName}/${this.editingID}`).update({
      name: this.editingName
    })
    this.toggleEditing()
  }

  deleteTodo(id: string) {
    this.afs.doc<Task>(`${this.collectionName}/${id}`).delete()
  }

  toggleEditing(item?: TaskWithID) {
    this.editingID = item ? item.id : ''
    this.editingName = item ? item.name : ''
  }

  toggleCompleted(item: TaskWithID) {
    this.afs.doc<Task>(`${this.collectionName}/${item.id}`).update({
      completed: !item.completed
    })
  }
}
