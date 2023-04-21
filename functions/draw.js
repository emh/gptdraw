export async function onRequest(context) {
    console.log('draw');
    const request = context.request;
    const svg = await request.text();
    const uuid = self.crypto.randomUUID();

    await context.env.IMAGES.put(uuid, svg);

    const json = {
        url: `http://127.0.0.1/render?${uuid}`
    };

    return new Response(JSON.stringify(json), {
        headers: {
            "content-type": "application/json"
        }
    });
}
