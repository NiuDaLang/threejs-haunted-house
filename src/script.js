import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/Addons.js'
import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI({title: 'Ghosts'})
gui.close()
const guiColors = gui.addFolder('Colors')
guiColors.close()
const guiSpeed = gui.addFolder('Speed')
guiSpeed.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Texture Loader
const textureLoader = new THREE.TextureLoader()

// Floor textures
const floor_alpha = textureLoader.load('./floor/alpha.jpg')

const floor_arm = textureLoader.load('./floor/forest_leaves_03_arm_1k.webp')
const floor_diff = textureLoader.load('./floor/forest_leaves_03_diff_1k.webp')
const floor_disp = textureLoader.load('./floor/forest_leaves_03_disp_1k.webp')
const floor_nor_gl = textureLoader.load('./floor/forest_leaves_03_nor_gl_1k.webp')
floor_arm.repeat.set(5,5)
floor_diff.repeat.set(5,5)
floor_disp.repeat.set(5,5)
floor_nor_gl.repeat.set(5,5)

floor_diff.colorSpace = THREE.SRGBColorSpace

floor_arm.wrapS = THREE.RepeatWrapping
floor_arm.wrapT = THREE.RepeatWrapping
floor_diff.wrapS = THREE.RepeatWrapping
floor_diff.wrapT = THREE.RepeatWrapping
floor_disp.wrapS = THREE.RepeatWrapping
floor_disp.wrapT = THREE.RepeatWrapping
floor_nor_gl.wrapS = THREE.RepeatWrapping
floor_nor_gl.wrapT = THREE.RepeatWrapping

// Grave1 textures
const grave1_diff = textureLoader.load('./grave1/seaside_rock_diff_1k.webp')
const grave1_arm = textureLoader.load('./grave1/seaside_rock_arm_1k.webp')
const grave1_normal = textureLoader.load('./grave1/seaside_rock_nor_gl_1k.webp')
const grave1_disp = textureLoader.load('./grave1/seaside_rock_disp_1k.png')

grave1_diff.colorSpace = THREE.SRGBColorSpace

// Grave2 textures
const grave2_diff = textureLoader.load('./grave2/old_wood_floor_diff_1k.webp')
const grave2_arm = textureLoader.load('./grave2/old_wood_floor_arm_1k.webp')
const grave2_disp = textureLoader.load('./grave2/old_wood_floor_disp_1k.webp')
const grave2_normal = textureLoader.load('./grave2/old_wood_floor_nor_gl_1k.webp')
grave2_diff.rotation = Math.PI / 2
grave2_arm.rotation = Math.PI / 2
grave2_disp.rotation = Math.PI / 2
grave2_normal.rotation = Math.PI / 2

grave2_diff.colorSpace = THREE.SRGBColorSpace

grave2_diff.repeat.set(2,2)
grave2_arm.repeat.set(2,2)
grave2_disp.repeat.set(1,1)
grave2_normal.repeat.set(2,2)

grave2_diff.wrapS = THREE.RepeatWrapping
grave2_arm.wrapS = THREE.RepeatWrapping
grave2_disp.wrapS = THREE.RepeatWrapping
grave2_normal.wrapS = THREE.RepeatWrapping
grave2_diff.wrapT = THREE.RepeatWrapping
grave2_arm.wrapT = THREE.RepeatWrapping
grave2_disp.wrapT = THREE.RepeatWrapping
grave2_normal.wrapT = THREE.RepeatWrapping

// Wall
const wall_diff = textureLoader.load('./wall/wood_trunk_wall_diff_1k.webp')
const wall_arm = textureLoader.load('./wall/wood_trunk_wall_arm_1k.webp')
const wall_nor_gl = textureLoader.load('./wall/wood_trunk_wall_nor_gl_1k.webp')

wall_diff.colorSpace = THREE.SRGBColorSpace

wall_diff.repeat.set(8,1)
wall_arm.repeat.set(8,1)
wall_nor_gl.repeat.set(8,1)

wall_diff.wrapS = THREE.RepeatWrapping
wall_arm.wrapS = THREE.RepeatWrapping
wall_nor_gl.wrapS = THREE.RepeatWrapping
wall_diff.wrapT = THREE.RepeatWrapping
wall_arm.wrapT = THREE.RepeatWrapping
wall_nor_gl.wrapT = THREE.RepeatWrapping

// Roof
const roof_diff = textureLoader.load('./roof/sparse_grass_diff_1k.webp')
const roof_arm = textureLoader.load('./roof/sparse_grass_arm_1k.webp')
const roof_normal = textureLoader.load('./roof/sparse_grass_nor_gl_1k.webp')

roof_diff.colorSpace = THREE.SRGBColorSpace

roof_diff.repeat.set(5, 5)
roof_arm.repeat.set(5, 5)
roof_normal.repeat.set(5, 5)

roof_diff.wrapS = THREE.RepeatWrapping
roof_arm.wrapS = THREE.RepeatWrapping
roof_normal.wrapS = THREE.RepeatWrapping
roof_diff.wrapT = THREE.RepeatWrapping
roof_arm.wrapT = THREE.RepeatWrapping
roof_normal.wrapT = THREE.RepeatWrapping

// Door
const door_diff = textureLoader.load('./door1/wood_peeling_paint_weathered_diff_1k.webp')
const door_arm = textureLoader.load('./door1/wood_peeling_paint_weathered_arm_1k.webp')
const door_normal = textureLoader.load('./door1/wood_peeling_paint_weathered_nor_gl_1k.webp')

door_diff.colorSpace = THREE.SRGBColorSpace

door_diff.rotation = Math.PI * 0.5

door_diff.repeat.set(2,2)

door_diff.wrapS = THREE.RepeatWrapping
door_diff.wrapT = THREE.RepeatWrapping

// Bush
const bush_diff = textureLoader.load('./bush/leaves_forest_ground_diff_1k.webp')
const bush_arm = textureLoader.load('./bush/leaves_forest_ground_arm_1k.webp')
const bush_normal = textureLoader.load('./bush/leaves_forest_ground_nor_gl_1k.webp')
const bush_disp = textureLoader.load('./bush/leaves_forest_ground_disp_1k.webp')

bush_diff.colorSpace = THREE.SRGBColorSpace

bush_diff.repeat.set(1.5,1)
bush_arm.repeat.set(1.5,1)
bush_normal.repeat.set(1.5,1)

bush_diff.wrapS = THREE.RepeatWrapping
bush_arm.wrapS = THREE.RepeatWrapping
bush_normal.wrapS = THREE.RepeatWrapping
bush_disp.wrapS = THREE.RepeatWrapping
bush_diff.wrapT = THREE.RepeatWrapping
bush_arm.wrapT = THREE.RepeatWrapping
bush_normal.wrapT = THREE.RepeatWrapping
bush_disp.wrapT = THREE.RepeatWrapping

// Text
const text_texture = textureLoader.load('./text.png')
text_texture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */

// House Group
const house = new THREE.Group()
house.rotation.y = 3.58
scene.add(house)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,200,200),
    new THREE.MeshStandardMaterial({
        alphaMap: floor_alpha,
        transparent: true,
        map: floor_diff,
        aoMap: floor_arm,
        roughnessMap: floor_arm,
        metalnessMap: floor_arm,
        displacementMap: floor_disp,
        displacementScale: 0.299,
        displacementBias: -0.082,
        normalMap: floor_nor_gl
    })
)
floor.rotation.x = - Math.PI / 2
house.add(floor)

// House
const houseBldg = new THREE.Mesh(
    new THREE.CylinderGeometry(1.7,1.7,1.7,5,1),
    new THREE.MeshStandardMaterial({    
        map: wall_diff,
        aoMap: wall_arm,
        roughnessMap: wall_arm,
        metalnessMap: wall_arm,
        normalMap: wall_nor_gl,
    })
)
houseBldg.position.y += houseBldg.geometry.parameters.height / 2
house.add(houseBldg)

// Roof
const edge = 2.7
const roofHeight = Math.sqrt(2 * Math.pow(edge, 2)) * 0.5

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roof_diff,
        aoMap: roof_arm,
        roughnessMap: roof_arm,
        metalnessMap: roof_arm,
        normalMap: roof_normal
    })
)
roof.position.y = houseBldg.geometry.parameters.height + roof.geometry.parameters.height / 2
roof.rotation.y = Math.PI * 0.25

house.add(roof)

// Door
for(let i = 0; i < 2; i++){
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.55,1.5,0.1, 100, 100, 5),
        new THREE.MeshStandardMaterial({
            map: door_diff,
            aoMap: door_arm,
            roughnessMap: door_arm,
            metalnessMap: door_arm,
            normalMap: door_normal
        })
    )
    door.position.x = - door.geometry.parameters.width / 2 + i * door.geometry.parameters.width * 1.02
    door.position.y += door.geometry.parameters.height / 2
    door.position.z -= houseBldg.geometry.parameters.radiusBottom * Math.sin(Math.PI/180 * 54) + 0.01
    door.rotation.y = Math.PI + 0.1
    door.rotation.z = - 0.1 * i
    house.add(door)
}

const shade = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1.2),
    new THREE.MeshStandardMaterial({color: 0x000000})
)
shade.position.y += shade.geometry.parameters.height / 2
shade.position.z -= houseBldg.geometry.parameters.radiusBottom * Math.sin(Math.PI/180 * 54) + 0.005
shade.rotation.y = Math.PI
house.add(shade)

// Bushes
const bushGeometrySizes = [0.5, 0.25, 0.3, 0.3, 0.47, 0.38, 0.3]
const bushPositions = [
    [-2.31, 0.156, -0.835],
    [-1.868, 0.132, -1.278],
    [2.041, 0.205, 1.525],
    [2.336, 0.181, -2.015],
    [-1.646, 0.23, 1.156],
    [2.41, 0.279, 1.23],
    [-0.171, 0.254, 1.967]
]

const bushes = []
for(let i = 0; i < 7; i++) {
    const bush = new THREE.Mesh(
        new THREE.SphereGeometry(bushGeometrySizes[i], 32, 32),
        new THREE.MeshStandardMaterial({
            map: bush_diff,
            aoMap: bush_arm,
            roughnessMap: bush_arm,
            metalnessMap: bush_arm,
            normalMap: bush_normal,
            displacementMap: bush_disp,
            displacementScale: -0.208,
            displacementBias: 0.046,
            color: 0xf3ff94
        })
    )
    bush.position.set(
        bushPositions[i][0],
        bushPositions[i][1],
        bushPositions[i][2]
    )
    bush.rotation.x = Math.PI * 0.37
    bush.rotation.z = Math.PI
    bushes.push(bush)
    house.add(bush)
}

// Graves
const count = 17
const grave2Material = {
    map: grave2_diff,
    aoMap: grave2_arm,
    roughnessMap: grave2_arm,
    metalnessMap: grave2_arm,
    displacementMap: grave2_disp,
    displacementScale: 0,
    normalMap: grave1_normal
}

for(let i = 0; i < count * 3; i++){
    let mesh;
    if (i < count) {
        // type 1
        mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5,0.5,0.2,10,10,10),
            new THREE.MeshStandardMaterial({
                map: grave1_diff,
                aoMap: grave1_arm,
                roughnessMap: grave1_arm,
                metalnessMap: grave1_arm,
                normalMap: grave1_normal,
                displacementMap: grave1_disp,
            })
        )
    } 
    else if (i >= count && i < count * 2) {
        // type 2
        mesh = new THREE.Group()
        
        const graveCrossV = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.72, 0.12),
            new THREE.MeshStandardMaterial(grave2Material)
        )
        graveCrossV.castShadow = true
        const graveCrossH = new THREE.Mesh(
            new THREE.BoxGeometry(0.48, 0.12, 0.14),
            new THREE.MeshStandardMaterial(grave2Material)
        )
        graveCrossH.castShadow = true
        graveCrossH.position.y += graveCrossV.geometry.parameters.height / 2 * 0.33
        mesh.position.y += graveCrossV.geometry.parameters.height / 2
        mesh.add(graveCrossV)
        mesh.add(graveCrossH)
    } 
    else if (i < count * 3) {
        // type 3
        const length = 8, width = 12;
        const shape = new THREE.Shape()
        shape.moveTo( 0,0 );
        shape.lineTo( 0, width );
        shape.lineTo( length, width );
        shape.lineTo( length, 0 );
        shape.lineTo( 0, 0 );

        const extrudeSettings = {
            steps: 2,
        	depth: 1.2,
        	bevelEnabled: true,
        	bevelThickness: 1,
        	bevelSize: 1,
        	bevelOffset: 0,
        	bevelSegments: 3
        }

        const graveType3Geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        const graveType3Material = new THREE.MeshStandardMaterial({
            color: 0x232323
        })
        mesh = new THREE.Mesh(graveType3Geometry, graveType3Material)
        mesh.scale.setScalar(0.045)
}
    if(mesh){
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * (10 - roofHeight - 2) + roofHeight + 2
        if (mesh.type === 'Mesh'){
            if (mesh.geometry.type === 'BoxGeometry') {
                mesh.position.set(Math.sin(angle) * radius, + mesh.geometry.parameters.height / 2, Math.cos(angle) * radius)
            } else if (mesh.geometry.type === 'ExtrudeGeometry') {
                mesh.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius)
            }
        } else if (mesh.type === 'Group') {
            mesh.position.set(Math.sin(angle) * radius, + mesh.position.y, Math.cos(angle) * radius)
        }
        mesh.rotation.x += (Math.random() - 0.5) * 0.5
        mesh.rotation.z += (Math.random() - 0.5) * 0.5
        mesh.rotation.y = Math.random() * Math.PI
        
        mesh.castShadow = true
        mesh.receiveShadow = true
        house.add(mesh)
    }
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
house.add(directionalLight)

// Door Light
const doorLight = new THREE.PointLight('#ffffff', 5, 2.01, 1.027)
doorLight.position.y = 1.64
doorLight.position.z = -2.007
house.add(doorLight)

// Ghosts
const length = 5 + Math.random() * 5
const ghostColors = [{color: '#fff266'}, {color: '#0b2801'}, {color: '#5422dd'}]
const ghostSpeed = [{speed: 0.8}, {speed: 0.8}, {speed: 0.8}]

const ghosts = []
for(let i = 0; i < 3; i++) {

    const ghost = new THREE.PointLight(ghostColors[i].color, Math.random() * 5 + 5)
    const outerRadiusX = Math.random() * length - length / 2
    const radiusX = outerRadiusX > 0 ? outerRadiusX + roof.geometry.parameters.radius : outerRadiusX - roof.geometry.parameters.radius
    const outerRadiusZ = Math.random() * length - length / 2
    const radiusZ = outerRadiusZ > 0 ? outerRadiusZ + roof.geometry.parameters.radius : outerRadiusZ - roof.geometry.parameters.radius
    ghost.position.x = radiusX
    ghost.position.y = Math.random() * 3
    ghost.position.z = radiusZ
    const ghostObject = {
        mesh: ghost,
        radiusX,
        y: ghost.position.y,
        radiusZ
    }
    ghosts.push(ghostObject)
    house.add(ghost)
    const string = `ghost ${i+1}`
    guiColors.addColor(ghostColors[i], 'color').onChange(() => ghost.color.set(ghostColors[i].color)).name(string)
    
    guiSpeed.add(ghostSpeed[i], 'speed').min(0).max(5).step(0.001).onFinishChange((value) => ghostSpeed[i].speed = value).name(string)

}
/**
 * Shadows
 */
// Cast Shadow
directionalLight.castShadow = true
for (let ghost of ghosts) {
    ghost.castShadow = true
}

roof.castShadow = true
houseBldg.castShadow = true
for (let bush of bushes) {
    bush.castShadow = true
}

// Receive Shadow
houseBldg.receiveShadow = true
floor.receiveShadow = true
for (let bush of bushes) {
    bush.receiveShadow = true
}

// Mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

for(let ghost of ghosts) {
    ghost.mesh.shadow.mapSize.width = 256
    ghost.mesh.shadow.mapSize.height = 256
    ghost.mesh.shadow.camera.far = 10
}

/**
 * Sky
 */
const sky = new Sky()
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['mieCoefficient'].value = 6.8
sky.material.uniforms['mieDirectionalG'].value = -0.325
sky.material.uniforms['sunPosition'].value.set(-1.801, -10, -6.226)
sky.scale.set(100, 100, 100)

scene.add(sky)

/**
 * Fog
 */
const colorObj = {
    color: '#042015'
}
scene.fog = new THREE.FogExp2(colorObj.color, 0.06578)

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    './fonts/Chogokuboso Gothic_Regular.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'music: http://www.hmix.net/',
            {
                font: font,
                size: 0.2,
                depth: 0.1,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )
        const textMaterial = new THREE.MeshMatcapMaterial({matcap: text_texture})
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.set(3.199, 0.987, -7.126)
        text.rotation.set(0, 0, 0.027)
        scene.add(text)
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Sound
 */
let bgmSource;
const bgm = () => {
    const listener = new THREE.AudioListener()
    camera.add(listener)
    
    const audioLoader = new THREE.AudioLoader()
    bgmSource = new THREE.Audio(listener)
    audioLoader.load('./bgm/n132.mp3', (buffer) => {
        bgmSource.setBuffer(buffer)
        bgmSource.setLoop(true)
        bgmSource.setVolume(0.3)
        bgmSource.play()
    })
}
const playBtn = document.querySelector('#playBtn')
let playing = false
playBtn.addEventListener('click', () => {
    if(playing){
        playing = false
        playBtn.innerHTML = 'Music &amp; Motion Play'
        bgmSource.pause()
    } else {
        playing = true
        playBtn.innerHTML = 'Stop Playing'
        bgm()
    }
})


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap


/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Playing
    if(playing){
        house.rotation.y = elapsedTime * 0.05
        house.rotation.x = Math.sin(elapsedTime * 0.05)
    }

    // Ghosts
    for(let i = 0; i < 3; i++){
        ghosts[i].mesh.position.x = Math.sin(elapsedTime * ghostSpeed[i].speed) * ghosts[i].radiusX
        ghosts[i].mesh.position.z = Math.cos(elapsedTime * ghostSpeed[i].speed) * ghosts[i].radiusZ
        ghosts[i].mesh.position.y = (Math.sin(elapsedTime) * Math.sin(elapsedTime * 3.5) * ghosts[i].y) * 1.5
    }

    // Directional Light
    directionalLight.position.x = Math.sin(elapsedTime * 0.6) * - 9
    directionalLight.position.z = Math.cos(elapsedTime * 0.6) * - 9
    directionalLight.lookAt(houseBldg.position)
    directionalLight.intensity = Math.sin(elapsedTime) + 1

    // Door Light Flickering
    doorLight.intensity = (Math.sin(elapsedTime * Math.random() * 4) * Math.sin(elapsedTime * 6) * Math.sin(elapsedTime * 9)) * 2

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()