// export const onRequestOptions = async () => {
//     return new Response(null, {
//         status: 204,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//             'Access-Control-Allow-Methods': 'GET, OPTIONS',
//             'Access-Control-Max-Age': '86400',
//         }
//     });
// };

export async function onRequest(context) {
    console.log('render');
    const request = context.request;
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const uuid = searchParams.get('uuid');

    console.log(uuid);

    const svg = await context.env.IMAGES.get(uuid);

    console.log(svg);

    const content = `
<html>
    <head>
        <meta property="og:image" content="data:image/svg+xml,${encodeURIComponent(svg)}" />
    </head>
    <body>
        ${svg}
    </body>
</html>
    `;

    return new Response(content, {
        status: 200,
        headers: {
            "content-type": "text/html"
        }
    });
}
