import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const teamMembers = [
    { id: 1, name: "Marc-Antoine", role: "Capitaine de Route", age: "48", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Jean-Philippe", role: "Mécano Chef", age: "45", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Stéphane", role: "Logistique & Ravitaillement", age: "50", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Christophe", role: "Éclaireur GPS", age: "42", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Laurent", role: "Photographe Officiel", age: "47", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Olivier", role: "Spécialiste Dénivelé", age: "46", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
    { id: 7, name: "Thierry", role: "Chroniqueur du Soir", age: "49", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop" },
    { id: 8, name: "Éric", role: "Médiateur de Squad", age: "44", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop" },
    { id: 9, name: "Bertrand", role: "Doyen Tactique", age: "50", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=800&auto=format&fit=crop" },
    { id: 10, name: "Nicolas", role: "Sprinteur de Fin", age: "41", image: "https://images.unsplash.com/photo-1542343607-d8560ca3dc21?q=80&w=800&auto=format&fit=crop" }
];

export default function Trombinoscope() {
    const [activeId, setActiveId] = useState(null);
    const listRef = useRef(null);
    const floatRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);

        // QuickSetter pour des performances maximales
        const setFloatX = gsap.quickSetter(floatRef.current, "x", "px");
        const setFloatY = gsap.quickSetter(floatRef.current, "y", "px");

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // On anime le conteneur flottant vers la souris avec une légère latence pour l'effet cinétique
            gsap.to(floatRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation d'entrée des noms
        gsap.from(".member-item", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const activeMember = teamMembers.find(m => m.id === activeId);

    return (
        <main className="bg-background min-h-screen pt-40 pb-32 px-6 md:px-16 relative">
            {/* TEXTURE GRAIN OVERLAY */}
            <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-3 text-dark/40 hover:text-accent font-mono text-xs uppercase tracking-[0.3em] mb-12 transition-all group">
                    <ArrowLeft size={16} />
                    <span className="group-hover:translate-x-2 transition-transform">Retour Base</span>
                </Link>

                <div className="flex flex-col mb-20">
                    <h1 className="font-sans font-black text-8xl md:text-[10rem] uppercase tracking-tighter leading-[0.85] italic mb-4">
                        Trombinoscope
                    </h1>
                    <p className="font-mono text-xl text-dark/60 max-w-2xl border-l-4 border-accent pl-6 py-2">
                        Les visages de l'effort. 10 opérateurs confirmés, prêts pour la Mission 2026.
                    </p>
                </div>

                {/* LISTE DES MEMBRES */}
                <div ref={listRef} className="relative z-10 flex flex-col border-t-2 border-dark/10">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="member-item group relative py-8 md:py-12 border-b-2 border-dark/10 cursor-none flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 hover:px-8 bg-transparent hover:bg-dark/5"
                            onMouseEnter={() => setActiveId(member.id)}
                            onMouseLeave={() => setActiveId(null)}
                        >
                            <div className="flex items-center gap-8 translate-x-0 group-hover:translate-x-4 transition-transform duration-500">
                                <span className="font-mono text-sm text-dark/20 font-black">0{member.id}</span>
                                <h2 className="font-sans font-black text-4xl md:text-7xl uppercase tracking-tighter group-hover:text-accent transition-colors">
                                    {member.name}
                                </h2>
                            </div>

                            <div className="flex flex-col md:items-end mt-4 md:mt-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-mono text-xs uppercase tracking-widest font-black text-accent">{member.role}</span>
                                <span className="font-sans font-bold text-lg md:text-2xl uppercase italic text-dark/60">{member.age} Ans</span>
                            </div>

                            {/* MOBILE ACCORDION CONTENT */}
                            <div className="md:hidden mt-6 h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                                <img src={member.image} alt={member.name} className="w-full aspect-video object-cover rounded-2xl border-4 border-dark shadow-[10px_10px_0_0_#111111]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FLOATING IMAGE (DESKTOP) */}
            <div
                ref={floatRef}
                className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block"
                style={{ translate: "-50% -50%", willChange: "transform" }}
            >
                <div className={`transition-all duration-500 transform ${activeId ? 'scale-100 opacity-100 rotate-3' : 'scale-50 opacity-0 rotate-12'}`}>
                    {activeMember && (
                        <div className="relative w-80 h-96 border-[8px] border-dark shadow-[30px_30px_60px_-15px_rgba(0,0,0,0.5)] bg-dark overflow-hidden rounded-3xl">
                            <img
                                src={activeMember.image}
                                alt={activeMember.name}
                                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex flex-col justify-end p-6">
                                <span className="text-accent font-mono text-[10px] uppercase font-black tracking-widest mb-1">Index_{activeMember.id}</span>
                                <span className="text-white font-sans font-black text-2xl uppercase italic">{activeMember.name}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
