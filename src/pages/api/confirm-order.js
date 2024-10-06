/* DB Supabase */

export default async function handler(req, res) {
  const response = await fetch(
    "https://qtdvllgzamuqiiztakux.supabase.co/rest/v1/FormData",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_KEY,
        Prefer: "return=representation",
      },
      body: JSON.stringify(req.body),
      //req.body refers to contact form body that is sent when submitting contact form
    }
  ).then((res) => res.json());
  console.log({ response });

  /*  sender et response og viser en status 200 og viser json object*/
  res.status(200).json({ response });
}
