export async function GET(request) {
  // 요청에서 URL 쿼리 파라미터 가져오기
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    // URL 파라미터가 없을 경우 에러 반환
    return new Response(JSON.stringify({ error: "URL parameter is missing" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // URL 디코딩 및 디버깅 로그
    const decodedUrl = decodeURIComponent(url);
    console.log("Decoded URL:", decodedUrl);

    // 외부 API 요청
    const response = await fetch(decodedUrl);
    const data = await response.text();

    // 정상적으로 데이터를 반환
    return new Response(data, {
      headers: { "Content-Type": "text/plain" },
      status: 200,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    // 에러 발생 시 JSON 응답 반환
    return new Response(
      JSON.stringify({ error: "Failed to fetch the resource" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
