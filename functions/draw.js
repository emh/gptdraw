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
    console.log('draw');
    const request = context.request;
    const { searchParams } = new URL(request.url);
    const svg = searchParams.get('svg');
    const uuid = self.crypto.randomUUID();

    console.log(uuid, svg);

    await context.env.IMAGES.put(uuid, svg);

    const json = {
        //url: `http://127.0.0.1/render?${uuid}`
        url: `https://gptdraw.pages.dev/render?uuid=${uuid}`
    };

    return new Response(JSON.stringify(json), {
        headers: {
            "content-type": "application/json"
        }
    });
}
