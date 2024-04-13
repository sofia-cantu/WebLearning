### Paso a paso de la creación de esta página

1. **Crear los documentos**

```bash
mkdir 01-basic-html           # Comando para crear la carpeta en la que nos encontramos
cd 01-basic-html              # Entramos
touch index.html profile.html README.md   # Creamos los archivos
```

2. **Crear contenido de documentos de html**
Escribí '!' y luego presione Tab para el template
En los comentarios se explica el contenido adicional

3. **commit with Github Desktop**
Primero agregamos los cambios con el siguiente comando:
```bash
git add .
```
podemos cambiar el ´.´por el archivo qur qeramos agregar.

Haz el commit con el mensaje que quieras
```bash
git commit -m "Mjs"
```

Enviar cambios al main
```bash
git push origin nombre-del-branch
```

Hacer commit al main 
```bash
git pull origin nombre-del-branch
```