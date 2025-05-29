"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export default function SessionHandler() {
  const { status } = useSession();

  // 로그인 성공 시 세션 저장
  useEffect(() => {
    if (status === "authenticated") {
      sessionStorage.setItem("isLoggedIn", "true");
    }
  }, [status]);

  // 탭 닫힘 감지 및 자동 로그아웃
  useEffect(() => {
    if (status !== "authenticated") return;

    const navEntries = performance.getEntriesByType("navigation");
    const navEntry = navEntries[0] as PerformanceNavigationTiming;

    // 최신 방식으로 리로드 체크
    const isReload =
      navEntry?.type === "reload" || performance.navigation.type === 1;

    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (!isReload && !isLoggedIn) {
      signOut({ redirect: false });
    }
  }, [status]);

  return null;
}
