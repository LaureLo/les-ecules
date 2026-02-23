import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { tripsData } from '../data/tripsData';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Map as MapIcon, Users, Camera } from 'lucide-react';
import gsap from 'gsap';

export default function Trip() {
    const { year } = useParams();
    const trip = tripsData.find(t => t.id === parseInt(year));
    const [photoIndex, setPhotoIndex] = useState(null);
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    const nextPhoto = (e) => {
        e.stopPropagation();
        setPhotoIndex((prev) => (prev + 1) % trip.photos.length);
    };

    const prevPhoto = (e) => {
        e.stopPropagation();
        setPhotoIndex((prev) => (prev - 1 + trip.photos.length) % trip.photos.length);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Animation du Hero
            gsap.from(".hero-title", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                skewY: 7,
                ease: "power4.out"
            });

            gsap.from(".hero-badge", {
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out"
            });

            // Parallax sur l'image de fond
            gsap.to(".hero-bg", {
                y: 150,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, [trip]);

    if (!trip) {
        return (
            <div className="min-h-screen bg-background text-dark flex flex-col items-center justify-center p-6">
                <h1 className="font-sans font-black text-6xl uppercase tracking-tighter mb-4">Erreur 404</h1>
                <p className="font-mono text-xl mb-8">Année non répertoriée dans nos archives.</p>
                <Link to="/" className="btn-magnetic bg-accent text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform">
                    <ArrowLeft size={20} /> Retour à la base
                </Link>
            </div>
        );
    }

    return (
        <main className="bg-background min-h-screen text-dark pb-32 overflow-x-hidden selection:bg-accent selection:text-white">
            {/* TEXTURE GRAIN OVERLAY */}
            <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* HERO SECTION */}
            <section ref={heroRef} className="relative w-full h-[85vh] flex items-end justify-start p-6 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-dark">
                    <img
                        src={trip.bg}
                        alt={`Trip ${trip.year} Background`}
                        className="hero-bg absolute inset-0 w-full h-[120%] object-cover opacity-80 filter contrast-125 brightness-75 rounded-b-[4rem] md:rounded-b-[8rem]"
                    />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${trip.gradient} opacity-40 mix-blend-multiply rounded-b-[4rem] md:rounded-b-[8rem]`}></div>
                <div className="absolute inset-0 bg-dark/20 rounded-b-[4rem] md:rounded-b-[8rem]"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
                    <div className="flex-1">
                        <Link to="/" className="inline-flex items-center gap-3 text-white/80 hover:text-white font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-all group">
                            <span className="w-12 h-[1px] bg-accent group-hover:w-20 transition-all duration-500"></span>
                            <span className="group-hover:translate-x-2 transition-transform duration-500">Retour au cockpit</span>
                        </Link>
                        <div className="overflow-hidden">
                            <h1 className="hero-title font-sans font-black text-8xl md:text-[12rem] text-white uppercase tracking-tighter italic leading-[0.85] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                {trip.title}
                            </h1>
                        </div>
                    </div>
                    <div className="hero-badge bg-white border-[4px] border-dark p-8 shadow-[15px_15px_0_0_#111111] md:rotate-2 hover:rotate-0 transition-transform duration-500 min-w-[280px]">
                        <div className="flex flex-col gap-4 font-mono">
                            <div>
                                <span className="text-accent font-black uppercase tracking-widest text-[10px] block mb-1">Status de mission</span>
                                <span className="text-dark font-black text-sm uppercase">Archive Confirmée</span>
                            </div>
                            <div className="h-[2px] bg-dark/10 w-full"></div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-dark/40 font-black uppercase tracking-widest text-[9px] block mb-1">Kilomètres</span>
                                    <span className="text-4xl font-black text-dark leading-none">{trip.distance}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-dark/40 font-black uppercase tracking-widest text-[9px] block mb-1">Index</span>
                                    <span className="text-xl font-black text-dark opacity-20">#{trip.year}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ITINÉRAIRE */}
            <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-b-4 border-dark/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-6 flex items-center gap-4">
                            <span className="w-16 h-[4px] bg-accent"></span> Vectorisation Terrain
                        </h2>
                        <h3 className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter mb-8 leading-[0.9]">{trip.route}</h3>
                        <div className="relative p-8 bg-white border-4 border-dark shadow-[10px_10px_0_0_rgba(255,94,91,0.1)]">
                            <p className="font-mono text-lg text-dark/80 leading-relaxed italic">
                                "Axe majeur de progression calculé. Les relevés de terrain indiquent une surface mixte avec dénivelé variable."
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <button className="relative w-full max-w-md aspect-video bg-dark text-white rounded-[3rem] overflow-hidden group shadow-[30px_30px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-all duration-700">
                            <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                                <MapIcon size={48} className="text-accent animate-bounce" />
                                <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase border-2 border-white px-8 py-4 bg-dark/80 hover:bg-accent hover:border-accent transition-all">
                                    Extraire les Data GPS
                                </span>
                            </div>
                            {/* Fausse carte stylisée en dessous */}
                            <svg viewBox="0 0 400 200" className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                <path d="M 50 120 Q 150 20, 200 120 T 350 80" fill="none" stroke="#FF5E5B" strokeWidth="12" strokeLinecap="round" className="drop-shadow-[0_0_15px_#FF5E5B]" />
                                <circle cx="50" cy="120" r="10" fill="white" stroke="#111" strokeWidth="4" />
                                <circle cx="350" cy="80" r="10" fill="#FF5E5B" stroke="#111" strokeWidth="4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* L'ESCOUADE */}
            <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-b-4 border-dark/5">
                <div className="flex justify-between items-end mb-20">
                    <div>
                        <h2 className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-4 flex items-center gap-4">
                            <span className="w-16 h-[4px] bg-accent"></span> Personnel Navigant
                        </h2>
                        <h3 className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter mb-0">L'Escouade</h3>
                    </div>
                    <div className="hidden md:block">
                        <Users size={64} className="text-dark/5" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {trip.squad && trip.squad.map((member) => (
                        <div key={member.id} className="bg-white border-[6px] border-dark p-6 shadow-[16px_16px_0_0_#111111] hover:-translate-y-4 hover:translate-x-4 hover:shadow-[4px_4px_0_0_#111111] transition-all duration-500 flex flex-col group">
                            <div className="w-full aspect-square bg-dark/5 overflow-hidden border-4 border-dark mb-6 relative">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest">{member.role}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-sans font-black text-3xl uppercase tracking-tighter mb-3">{member.name}</h4>
                                    <p className="font-mono text-sm text-dark/60 leading-relaxed italic border-l-2 border-dark/20 pl-4">{member.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PHOTOS */}
            {trip.photos && trip.photos.length > 0 && (
                <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-20">
                        <div>
                            <h2 className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-4 flex items-center gap-4">
                                <span className="w-16 h-[4px] bg-accent"></span> Capture Flux Visuel
                            </h2>
                            <h3 className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter">Archives</h3>
                        </div>
                        <div className="hidden md:block">
                            <Camera size={64} className="text-dark/5" />
                        </div>
                    </div>

                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                        {trip.photos.map((photo, idx) => (
                            <div
                                key={idx}
                                className="break-inside-avoid relative group overflow-hidden border-[6px] border-dark shadow-[12px_12px_0_0_#111111] hover:shadow-[4px_4px_0_0_#111111] hover:translate-x-2 hover:translate-y-2 transition-all duration-500 cursor-pointer"
                                onClick={() => setPhotoIndex(idx)}
                            >
                                <img
                                    src={photo}
                                    alt={`Archive ${trip.year} - ${idx}`}
                                    className="w-full h-auto object-cover filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors pointer-events-none"></div>
                                <div className="absolute bottom-6 left-6 bg-dark text-white font-mono text-[10px] uppercase px-3 py-1 font-black opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-xl">
                                    SIG_OUT_{trip.year}_{String(idx + 1).padStart(3, '0')}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* LIGHTBOX MODAL */}
            {photoIndex !== null && trip.photos && trip.photos.length > 0 && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12 cursor-pointer"
                    onClick={() => setPhotoIndex(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white bg-dark/50 hover:bg-accent p-3 rounded-full transition-colors z-50"
                        onClick={(e) => { e.stopPropagation(); setPhotoIndex(null); }}
                    >
                        <X size={24} />
                    </button>

                    <button
                        className="absolute left-4 md:left-12 text-white bg-dark/50 hover:bg-accent p-4 rounded-full transition-colors z-50"
                        onClick={prevPhoto}
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <img
                        src={trip.photos[photoIndex]}
                        alt={`Agrandissement archive ${trip.year} - ${photoIndex}`}
                        className="max-w-[90vw] max-h-[85vh] object-contain border-4 border-white shadow-[0_0_40px_rgba(0,0,0,0.8)]"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="absolute right-4 md:right-12 text-white bg-dark/50 hover:bg-accent p-4 rounded-full transition-colors z-50"
                        onClick={nextPhoto}
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-mono text-sm bg-dark/80 px-4 py-2 rounded-full border border-white/20">
                        {photoIndex + 1} / {trip.photos.length}
                    </div>
                </div>
            )}

        </main>
    );
}
