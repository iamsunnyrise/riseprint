import React from 'react';
import GroomHorse from '../Motifs/GroomHorse';
import DoliMotif from '../Motifs/DoliMotif';
import RingCeremonyMotif from '../Motifs/RingCeremonyMotif';
import ShehnaiKalash from '../Motifs/ShehnaiKalash';
import MandapMotif from '../Motifs/MandapMotif';
import StarburstBadge from '../Motifs/StarburstBadge';
import CouplePhotoFrame from '../Motifs/CouplePhotoFrame';

export default function InvitationBody({ data }) {
  const {
    inkColor,
    headingFont,
    salutation,
    graceText,
    middleShlokaLine1,
    middleShlokaLine2,
    groomPrefix,
    groomName,
    groomRelation,
    groomFather,
    groomVillage,
    groomThana,
    showGroomHorseMotif,
    showDoliMotif,
    showRingMotif,
    bridePrefix,
    brideName,
    brideRelation,
    brideFather,
    brideVillage,
    brideThana,
    showSangKalashMotif,
    showMandapMotif,
    starburstLine1,
    starburstLine2,
    starburstLine3
  } = data;

  return (
    <div className="w-full flex flex-col justify-between flex-1 py-1">
      {/* 1. Top Formal Salutation & Center Sacred Shloka (Text Plate) */}
      <div className="dtp-plate-text grid grid-cols-12 items-center gap-2 px-3">
        {/* Left Formal Salutation (Personalized if guest selected) */}
        {(() => {
          const activeGuest = data.activeGuestId && data.guestList
            ? data.guestList.find((g) => g.id === data.activeGuestId)
            : null;

          const displaySalutation = activeGuest && data.personalizedCardSalutation !== false
            ? `मान्यवर ${activeGuest.name}${activeGuest.relation ? ` (${activeGuest.relation})` : ''},`
            : salutation;

          return (
            <div className="col-span-5 text-left text-xs sm:text-[12px] leading-tight" style={{ color: inkColor }}>
              <div className="font-extrabold leading-snug">
                {displaySalutation}
              </div>
              <div className="font-medium mt-0.5 tracking-normal opacity-95 text-[11.5px] sm:text-xs">
                {graceText}
              </div>
            </div>
          );
        })()}


        {/* Center/Right Sacred Shloka with Om (Professionally Aligned Symmetrical Hemistichs) */}
        <div className="col-span-7 flex items-center justify-center" style={{ color: inkColor }}>
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 text-xs sm:text-[12.5px] font-bold tracking-tight">
            <span className="text-base sm:text-lg font-black select-none leading-none">ॐ</span>
            
            {(() => {
              // Parse shloka into balanced padas (left & right halves)
              const parseShlokaPadas = (line) => {
                if (!line) return { left: '', right: '' };
                const trimmed = line.trim();
                const sepMatch = trimmed.match(/[,;|/]/);
                if (sepMatch) {
                  const idx = sepMatch.index;
                  return {
                    left: trimmed.slice(0, idx + 1).trim(),
                    right: trimmed.slice(idx + 1).trim()
                  };
                }
                const words = trimmed.split(/\s+/);
                if (words.length >= 4) {
                  const mid = Math.ceil(words.length / 2);
                  return {
                    left: words.slice(0, mid).join(' '),
                    right: words.slice(mid).join(' ')
                  };
                }
                return { left: trimmed, right: '' };
              };

              const p1 = parseShlokaPadas(middleShlokaLine1);
              const p2 = parseShlokaPadas(middleShlokaLine2);
              const alignment = data.middleShlokaAlignment || 'balanced';
              const isTwoColumn = alignment !== 'center' && (p1.right || p2.right);

              if (isTwoColumn) {
                const rightColClass = alignment === 'column-left' ? 'text-left' : 'text-right';
                return (
                  <div className="inline-grid grid-cols-[auto_auto] gap-x-2.5 sm:gap-x-3.5 leading-snug">
                    <span className="text-left whitespace-nowrap">{p1.left}</span>
                    <span className={`${rightColClass} whitespace-nowrap`}>{p1.right}</span>
                    <span className="text-left whitespace-nowrap">{p2.left}</span>
                    <span className={`${rightColClass} whitespace-nowrap`}>{p2.right}</span>
                  </div>
                );
              }

              return (
                <div className="leading-snug text-center">
                  <div>{middleShlokaLine1}</div>
                  <div>{middleShlokaLine2}</div>
                </div>
              );
            })()}

            <span className="text-base sm:text-lg font-black select-none leading-none">ॐ</span>
          </div>
        </div>
      </div>

      {/* 2. Main Couple Details & Central Wedding Motifs (Zero Overlap Layout) */}
      {(() => {
        const isBrideFirst = data.hostSide === 'bride';

        const leftParty = isBrideFirst
          ? {
              prefix: bridePrefix,
              name: brideName,
              relation: brideRelation,
              father: brideFather,
              village: brideVillage,
              thana: brideThana
            }
          : {
              prefix: groomPrefix,
              name: groomName,
              relation: groomRelation,
              father: groomFather,
              village: groomVillage,
              thana: groomThana
            };

        const rightParty = isBrideFirst
          ? {
              prefix: groomPrefix,
              name: groomName,
              relation: groomRelation,
              father: groomFather,
              village: groomVillage,
              thana: groomThana
            }
          : {
              prefix: bridePrefix,
              name: brideName,
              relation: brideRelation,
              father: brideFather,
              village: brideVillage,
              thana: brideThana
            };

        return (
          <div className="flex items-center justify-between gap-1 my-2 px-2 sm:px-3">
            {/* Left Party (32% width - First Party: वधू if वधू पक्ष, वर if वर पक्ष) (Text Plate) */}
            <div className="dtp-plate-text w-[32%] text-left leading-tight" style={{ color: inkColor }}>
              <div
                className="text-base sm:text-lg font-extrabold tracking-wide mb-1"
                style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
              >
                <span className="text-xs sm:text-sm font-semibold mr-1">{leftParty.prefix}</span>
                {leftParty.name}
              </div>
              <div className="text-xs sm:text-[12px] space-y-0.5 font-medium">
                <div className="font-bold opacity-90">{leftParty.relation}</div>
                <div
                  className="font-extrabold text-sm sm:text-base tracking-wide"
                  style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
                >
                  {leftParty.father}
                </div>
                <div className="tracking-tight">{leftParty.village}</div>
                <div className="tracking-tight">{leftParty.thana}</div>
              </div>
            </div>

            {/* Center Motifs Section (36% width - Perfectly Proportioned) (Motif Plate) */}
            <div className="dtp-plate-motif w-[36%] flex items-center justify-center gap-1 px-1 flex-shrink-0">
              {data.showCouplePhoto && data.couplePhotoPlacement !== 'dedicated-banner' ? (
                <CouplePhotoFrame
                  photoUrl={data.couplePhotoUrl}
                  frame={data.couplePhotoFrame}
                  scale={data.couplePhotoScale}
                  borderColor={data.couplePhotoBorderColor || '#d4af37'}
                  isScreenPrint={data.screenPrintMode}
                  hideInScreenPrint={data.hidePhotosInScreenPrint !== false}
                  size="compact"
                />
              ) : (
                <>
                  {/* Groom on Horse (Baraat Horse) */}
                  {showGroomHorseMotif && (
                    <GroomHorse color={inkColor} />
                  )}

                  {/* Doli (Bride's Palanquin) */}
                  {showDoliMotif && (
                    <DoliMotif color={inkColor} />
                  )}

                  {/* Ring Ceremony */}
                  {showRingMotif && (
                    <RingCeremonyMotif color={inkColor} />
                  )}

                  {/* Shehnai Kalash with 'संग' */}
                  {showSangKalashMotif && (
                    <ShehnaiKalash color={inkColor} />
                  )}

                  {/* Sacred Mandap */}
                  {showMandapMotif && (
                    <MandapMotif color={inkColor} />
                  )}
                </>
              )}
            </div>

            {/* Right Party (32% width - Second Party: वर if वधू पक्ष, वधू if वर पक्ष) (Text Plate) */}
            <div className="dtp-plate-text w-[32%] text-right leading-tight" style={{ color: inkColor }}>
              <div
                className="text-base sm:text-lg font-extrabold tracking-wide mb-1"
                style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
              >
                <span className="text-xs sm:text-sm font-semibold mr-1">{rightParty.prefix}</span>
                {rightParty.name}
              </div>
              <div className="text-xs sm:text-[12px] space-y-0.5 font-medium">
                <div className="font-bold opacity-90">{rightParty.relation}</div>
                <div
                  className="font-extrabold text-sm sm:text-base tracking-wide"
                  style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
                >
                  {rightParty.father}
                </div>
                <div className="tracking-tight">{rightParty.village}</div>
                <div className="tracking-tight">{rightParty.thana}</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Dedicated Royal Couple Photo Banner (when dedicated-banner is chosen) */}
      {data.showCouplePhoto && data.couplePhotoPlacement === 'dedicated-banner' && (
        <div className="dtp-plate-motif w-full flex items-center justify-center my-1.5">
          <CouplePhotoFrame
            photoUrl={data.couplePhotoUrl}
            frame={data.couplePhotoFrame}
            scale={data.couplePhotoScale}
            borderColor={data.couplePhotoBorderColor || '#d4af37'}
            isScreenPrint={data.screenPrintMode}
            hideInScreenPrint={data.hidePhotosInScreenPrint !== false}
            size="large"
          />
        </div>
      )}

      {/* 3. Central Starburst / Announcement Seal (Motif Plate) */}
      <div className="dtp-plate-motif w-full my-1">
        <StarburstBadge
          line1={starburstLine1}
          line2={starburstLine2}
          line3={starburstLine3}
          color={inkColor}
          className="w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
}
