import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { collection, deleteDoc, doc, addDoc, getDocs, getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'



interface Entrada {
  id?: string
  titulo: string
  descripcion: string
  articulo: string
}

export const useBlog = () => {

const router = useRouter()
const db = getFirestore()

const entradas = ref<Entrada[]>([])
const isLogued = ref(false)
const isSave = ref(false)
const titulo = ref('')
const descripcion = ref('')

onAuthStateChanged(
  getAuth(),
  user => user ? isLogued.value = true : isLogued.value = false
)

const navegar = (id: string) => {
  router.push({ name: 'ver-blog', params: { id }})
}

const eliminar = async (id: string) => {
  const docRef = doc(db, 'entradas', id)
  await deleteDoc(docRef)

  entradas.value = []
  obtenerEntradas()
}

const obtenerEntradas = async () => {

  const refCollection = collection(db, 'entradas')

  try {
    
    const documentos = await getDocs( refCollection )

    documentos.forEach( entrada => {
      entradas.value.push({
        id: entrada.id,
        titulo: entrada.data().titulo,
        descripcion: entrada.data().descripcion,
        articulo: entrada.data().articulo,
      })
    })

  } catch (error) {
    console.log(error)
  }


}



// -------------------------

const guardar = async (texto: string) => {
  if ( titulo.value === '' || descripcion.value === '' || texto === '' ) return

  isSave.value = true

  const entrada: Entrada = {
    titulo: titulo.value,
    descripcion: descripcion.value,
    articulo: texto
  }

  await guardarDocumento(entrada)
  isSave.value = false
  router.push({ name: 'list-blog'})
}

const guardarDocumento = async (entrada: Entrada) => {

  const refCollection = collection( db, 'entradas')
  
  try {
    await addDoc(refCollection, entrada)
  } catch (error) {
    console.log(error)
  }
}


  return {
    isLogued,
    entradas,
    isSave,
    titulo,
    descripcion,

    navegar,
    eliminar,
    obtenerEntradas,
    guardar

  }
}