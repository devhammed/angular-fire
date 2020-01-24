import { Component, OnInit } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Item, ItemWithID } from './models/Item'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  task: string
  editingID: string
  editingName: string
  items: Observable<ItemWithID[]>
  private collectionName = 'items'
  private itemsCollection: AngularFirestoreCollection<Item>

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.itemsCollection = this.afs.collection<Item>(this.collectionName)
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(action => {
          const id = action.payload.doc.id
          const data = action.payload.doc.data() as Item
          return { id, ...data }
        })
      )
    )
  }

  addItem() {
    if (!this.task) {
      return
    }

    this.itemsCollection.add({
      name: this.task,
      completed: false
    })

    this.task = ''
  }

  updateItem() {
    this.afs.doc<Item>(`${this.collectionName}/${this.editingID}`).update({
      name: this.editingName
    })
    this.startEditing()
  }

  startEditing(item?: ItemWithID) {
    this.editingID = item ? item.id : ''
    this.editingName = item ? item.name : ''
  }

  onChangeTask($event: Event) {
    this.editingName = ($event.target as HTMLInputElement).value
  }

  toggleCompleted(item: ItemWithID) {
    this.afs.doc<Item>(`${this.collectionName}/${item.id}`).update({
      completed: !item.completed
    })
  }
}
