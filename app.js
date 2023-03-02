const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//          < --- Gracias --- >  

const flowGracias = addKeyword('gracias')
.addAnswer('Gracias por contactarnos, cualquier cosa solo escribe *Hola*')	

const flowCompra = addKeyword(['comprar','compra'])
.addAnswer('La compra se realizo')
.addAnswer([
    'Para comprar otra cosa escribe *Productos*',
    'Para salir escribe *Gracias*'
],
    null,
    null,
    [flowGracias]
)



//          < --- PELUCHE --- >  
const flowPeluche = addKeyword('peluche')
    .addAnswer('*TUKI PELUCHE*',{
            media: 'https://pm1.narvii.com/7851/f01b87622416af3f459d353b40fc6d07b70f3240r1-713-402v2_hq.jpg'
        }
        )
    .addAnswer([
        '*Pelcuhe TUKI*', 
        'Peluche 100% de algodón, realizado desde casa, y con mucho cariño 😊',
        'Precio: de lo que salga de tu corazón.',
        'Si deseas comprarlo escribe *comprar*'
])


//          < --- COMIDA --- >

const flowTorta = addKeyword(['torta', 'tort'])
.addAnswer('*TORTA TUKI*',{
    media: 'https://www.boredpanda.com/blog/wp-content/uploads/2023/01/funny-cake-shaming-63d3c7f13b0b4__700.jpg'
})
    .addAnswer([
        '*Torta TUKI*', 
        'Torta 100% realizado con elementos naturales, y con mucho cariño 😊',
        'Precio: de lo que salga de tu corazón.',
        'Si deseas comprarlo escribe *comprar*'
    ],
        null,
        null,
        [flowCompra]
    )

    const flowMalteada = addKeyword(['maletada', 'maltead'])
    .addAnswer('*MALTEADA TUKI* (anque no sea una malteada de sapito, pero es un sapito tomando una malteada :) )',{
        media: 'https://ih1.redbubble.net/image.2428382918.5622/mp,504x516,gloss,f8f8f8,t-pad,600x600,f8f8f8.jpg'
    })
    .addAnswer([
        '*Malteada TUKI*', 
        'Torta 100% realizado con elementos naturales, y con mucho cariño 😊',
        'Precio: de lo que salga de tu corazón.',
        'Si deseas comprarlo escribe *comprar*'
    ],
        null,
        null,
        [flowCompra]
    )

const flowComida = addKeyword('comida')
    .addAnswer('Deliciosa comida con forma de sapitoo')
    .addAnswer(
        [
            '*Torta* con forma de sapito',
            '*Malteada* con ingredientes verdes'
        ],
        null,
        null,
        [flowTorta, flowMalteada]
    )

    
    
//          < --- PERSONA --- >  
const  flowPersona = addKeyword('persona')
.addAnswer('JOSETUKIDEODO',{
    media: 'https://codigoesports.com/wp-content/uploads/2022/04/tuki.jpg'
}
)
.addAnswer('NO esta a la venta pero vale la pena ver su bella carita :)')

//          < --- PRODUCTOS --- >  
const flowProductos = addKeyword(['productos','products','producto'])
    .addAnswer('Aqui Se mostraran algunos productos... :)')
    .addAnswer(
        [
            '😜 TUKI *Peluche*',
            '😋 TUKI *Comida*',
            '🥰 TUKI *Persona* (edicion especial)',
            '😉 Seleccione la opcion que desea 😝'
        ]
    )
    .addAnswer('Seleccione la opcion que desea',{
        buttons:[
            {
                body:'peluche'
            },
            {
                body:'comida'
            },
            {
                body:'persona'
            }
        ]
    })


//          < --- FLUJO PRINCIAL --- >  
const flowPrincipal = addKeyword(['hola', 'buenas', 'alo','Hola','wenas','Wenas','Buenas'])
    .addAnswer('🙌 Hola bienvenido a esta prueba del chat Bot')
    .addAnswer(
        [
            ' 🐸 Bienvenido a TUKI 🐸',
            ' 👉 Dirigirse a Productos, Escriba *productos*'
        ],
        null,
        null,
        [flowProductos]
    )

    

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowProductos,flowPeluche,flowComida,flowPersona,flowCompra,flowGracias])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
