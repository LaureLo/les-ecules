import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { tripsData } from '../data/tripsData';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Trip() {
    const { year } = useParams();
    const trip = tripsData.find(t => t.id === parseInt(year));
    const [photoIndex, setPhotoIndex] = useState(null);

    const nextPhoto = (e) => {
        e.stopPropagation();
        setPhotoIndex((prev) => (prev + 1) % trip.photos.length);
    };

    const prevPhoto = (e) => {
        e.stopPropagation();
        setPhotoIndex((prev) => (prev - 1 + trip.photos.length) % trip.photos.length);
    };

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
        <main className="bg-background min-h-screen text-dark pb-32">
            {/* HERO SECTION */}
            <section className="relative w-full h-[80vh] flex items-end justify-start p-6 md:p-16 overflow-hidden">
                <img src={trip.bg} alt={`Trip ${trip.year} Background`} className="absolute inset-0 w-full h-full object-cover rounded-b-[4rem]" />
                <div className={`absolute inset-0 bg-gradient-to-t ${trip.gradient} opacity-60 mix-blend-multiply rounded-b-[4rem]`}></div>
                <div className="absolute inset-0 bg-dark/40 rounded-b-[4rem]"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-mono text-sm uppercase tracking-widest mb-6 transition-colors group">
                            <span className="w-8 h-[2px] bg-accent group-hover:w-12 transition-all"></span> Retour
                        </Link>
                        <h1 className="font-sans font-black text-7xl md:text-[9rem] text-white uppercase tracking-tighter italic leading-none drop-shadow-2xl">
                            {trip.title}
                        </h1>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border-[3px] border-white/20 p-6 rounded-3xl text-white font-mono flex flex-col gap-2 min-w-[200px]">
                        <span className="text-accent font-bold uppercase tracking-widest text-xs">Distance</span>
                        <span className="text-2xl font-black">{trip.distance}</span>
                        <span className="text-white/50 text-xs mt-2 uppercase">{trip.route}</span>
                    </div>
                </div>
            </section>

            {/* ITINÉRAIRE */}
            <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-b-2 border-dark/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-accent font-mono text-sm uppercase tracking-widest font-bold mb-4 flex items-center gap-4">
                            <span className="w-12 h-[2px] bg-accent"></span> Navigation Actuelle
                        </h2>
                        <h3 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter mb-6">{trip.route}</h3>
                        <p className="font-mono text-lg text-dark/70 border-l-4 border-accent pl-6 py-2">
                            Axe majeur de progression calculé. Les relevés de terrain indiquent une surface mixte avec dénivelé variable.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        {/* Placeholder Map ou Bouton d'ouverture de Map */}
                        <button className="relative w-full max-w-md aspect-video bg-dark text-white rounded-[2rem] overflow-hidden group shadow-2xl hover:scale-[1.02] transition-transform">
                            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                                <span className="font-mono text-sm font-bold tracking-widest uppercase border-2 border-white px-6 py-3 bg-dark/80 backdrop-blur-sm group-hover:bg-accent group-hover:border-accent transition-colors">
                                    Afficher la trace radar
                                </span>
                            </div>
                            {/* Fausse carte stylisée en dessous */}
                            <svg viewBox="0 0 400 200" className="w-full h-full opacity-30">
                                <path d="M 50 100 Q 150 20, 200 100 T 350 100" fill="none" stroke="#FF5E5B" strokeWidth="8" strokeLinecap="round" />
                                <circle cx="50" cy="100" r="12" fill="currentColor" />
                                <circle cx="350" cy="100" r="12" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* L'ESCOUADE (CSS GRID Néo-Brutaliste) */}
            <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-b-2 border-dark/10">
                <h2 className="text-accent font-mono text-sm uppercase tracking-widest font-bold mb-16 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-accent"></span> Opérateurs Confirmés
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {trip.squad && trip.squad.map((member) => (
                        <div key={member.id} className="bg-white border-4 border-dark p-4 shadow-[12px_12px_0_0_#111111] hover:-translate-y-2 hover:translate-x-2 hover:shadow-[4px_4px_0_0_#111111] transition-all flex flex-col group">
                            {/* Polaroid Image */}
                            <div className="w-full aspect-square bg-dark/5 overflow-hidden border-2 border-dark mb-4">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-sans font-black text-2xl uppercase tracking-tighter">{member.name}</h4>
                                        <span className="font-mono text-[10px] bg-accent text-white px-2 py-1 uppercase font-bold">{member.role}</span>
                                    </div>
                                    <p className="font-mono text-sm text-dark/70 leading-relaxed">{member.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PHOTOS (Galerie / Masonry) */}
            {trip.photos && trip.photos.length > 0 && (
                <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
                    <h2 className="text-accent font-mono text-sm uppercase tracking-widest font-bold mb-16 flex items-center gap-4">
                        <span className="w-12 h-[2px] bg-accent"></span> Archives Visuelles
                    </h2>

                    {/* Colonnes CSS (columns-1 md:columns-2 lg:columns-3) pour l'effet Masonry natif */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {trip.photos.map((photo, idx) => (
                            <div 
                                key={idx} 
                                className="break-inside-avoid relative group overflow-hidden border-4 border-dark shadow-[8px_8px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
                                onClick={() => setPhotoIndex(idx)}
                            >
                                <img
                                    src={photo}
                                    alt={`Archive ${trip.year} - ${idx}`}
                                    className="w-full h-auto object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors pointer-events-none"></div>
                                <div className="absolute bottom-4 left-4 bg-dark text-white font-mono text-[10px] uppercase px-2 py-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                    IMG_{trip.year}_{String(idx + 1).padStart(3, '0')}
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
