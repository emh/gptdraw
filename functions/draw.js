export async function onRequest(context) {
    console.log('draw');
    const request = context.request;
    const body = await request.json();
    const svg = body.svg;
    const uuid = self.crypto.randomUUID();

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
