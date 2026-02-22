import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from './lib/supabase';
import { Eye, EyeOff, Send, MessageSquare, X, Bike, Paperclip, Download, FileText, PlayCircle, Image as ImageIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function HeaderLogo() {
    return (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[120px] md:h-[120px] transition-transform duration-300 hover:rotate-12 bg-white rounded-full border-4 border-[#F5F3EE] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] z-50 flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-[85%] h-[85%] text-accent drop-shadow-sm">
                <defs>
                    <path id="top-arc" d="M 24,60 A 36,36 0 0,1 96,60" fill="none" />
                    <path id="bottom-arc" d="M 14,60 A 46,46 0 0,0 106,60" fill="none" />
                </defs>
                <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="60" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="1" />

                <text className="font-sans font-bold text-[15px] uppercase tracking-widest" fill="currentColor">
                    <textPath href="#top-arc" startOffset="50%" textAnchor="middle" letterSpacing="0.1em">
                        LES
                    </textPath>
                </text>
                <text className="font-sans font-bold text-[15px] uppercase tracking-widest" fill="currentColor">
                    <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle" letterSpacing="0.1em">
                        ÉCULÉS
                    </textPath>
                </text>

                <circle cx="18" cy="60" r="2.5" fill="currentColor" />
                <circle cx="102" cy="60" r="2.5" fill="currentColor" />

                <g transform="translate(37, 35) scale(0.5)">
                    <circle cx="25" cy="65" r="16" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="75" cy="65" r="16" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M25 65 L40 35 L68 35 L75 65" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M40 35 L34 20 M25 20 L38 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M68 35 L50 65 L25 65" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M68 35 L72 22 C 77 14 85 20 80 28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="50" cy="65" r="4" fill="none" stroke="currentColor" strokeWidth="4" />
                </g>
            </svg>
        </div>
    );
}

function Navbar({ user, onJoinClick, onProfileClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <nav
            className="group fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between pl-20 pr-4 md:pl-28 md:pr-4 py-2 rounded-full transition-all duration-300 w-[90%] max-w-5xl border border-dark/10 bg-background/80 backdrop-blur-xl shadow-lg text-accent"
        >
            <HeaderLogo />
            <div className="hidden md:flex gap-8 font-mono text-lg uppercase">
                <a href="#features" className="hover:-translate-y-[1px] transition-all duration-300">Itinéraire</a>
                <a href="#features" className="hover:-translate-y-[1px] transition-all duration-300">Dates</a>
                <a href="#features" className="hover:-translate-y-[1px] transition-all duration-300">Équipage</a>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="relative group/user z-50">
                        <button
                            className="flex items-center gap-3 bg-dark text-white px-5 py-3 rounded-full font-mono text-sm uppercase tracking-widest hover:bg-accent transition-colors"
                        >
                            {user.user_metadata?.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-white/20" />
                            ) : (
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mx-2" />
                            )}
                            <span className="font-bold">{user.user_metadata?.nickname || user.email.split('@')[0]}</span>
                            {(user.user_metadata?.role || user.user_metadata?.bike_name) && (
                                <span className="hidden md:inline text-[10px] opacity-70 border-l border-white/30 pl-3">
                                    {user.user_metadata?.role || "Pilote"}
                                </span>
                            )}
                        </button>
                        <div className="absolute right-0 top-full pt-2 w-48 opacity-0 group-hover/user:opacity-100 transition-all pointer-events-none group-hover/user:pointer-events-auto origin-top-right">
                            <div className="bg-[#F5F3EE] border-4 border-dark rounded-xl shadow-[8px_8px_0px_0px_#111111] p-2 flex flex-col gap-1">
                                <button
                                    onClick={onProfileClick}
                                    className="w-full text-left px-4 py-2 hover:bg-black/5 rounded-lg font-mono text-xs uppercase text-dark font-bold"
                                >
                                    Carnet de bord
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 hover:bg-accent hover:text-white rounded-lg font-mono text-xs uppercase text-dark font-bold transition-colors"
                                >
                                    Se déconnecter
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={onJoinClick}
                        className="btn-magnetic bg-accent text-white px-5 py-2 rounded-full font-sans font-bold text-sm tracking-wide"
                    >
                        Rejoindre
                    </button>
                )}
            </div>
        </nav>
    );
}

function AuthModal({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                if (password !== confirmPassword) {
                    throw new Error("Les mots de passe ne correspondent pas.");
                }
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            nickname: nickname
                        }
                    }
                });
                if (error) throw error;
                alert('Vérifiez vos emails pour confirmer l\'inscription !');
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4 z-[99999999]"
            style={{ backgroundColor: 'rgba(0,0,0,0.98)' }}
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-[#F5F3EE] rounded-[2.5rem] border-[8px] border-dark p-8 relative shadow-[25px_25px_0px_0px_#E63B2E]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center border-4 border-dark shadow-xl hover:scale-110 transition-transform"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <h2 className="font-sans font-black text-4xl uppercase tracking-tighter text-dark mb-6 italic">
                    {isLogin ? 'Connexion' : 'Inscription'}
                </h2>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Votre adresse email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border-4 border-dark rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                            placeholder="exemple@email.com"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Votre Nom / Pseudo</label>
                            <input
                                type="text"
                                required
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="w-full bg-white border-4 border-dark rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                                placeholder="NonoBG"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Votre mot de passe</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border-4 border-dark rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors pr-12"
                                placeholder="********"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 hover:text-accent transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Confirmez le mot de passe</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white border-4 border-dark rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors pr-12"
                                    placeholder="********"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 hover:text-accent transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-accent/10 border-2 border-accent p-3 rounded-lg font-mono text-[10px] text-accent uppercase font-bold">
                            Error: {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-dark text-white py-4 rounded-xl font-sans font-black uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Traitement...' : isLogin ? 'Démarrer la session' : 'Créer le profil'}
                    </button>
                </form>

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full mt-6 font-mono text-[10px] uppercase font-bold text-dark/50 hover:text-accent transition-colors"
                >
                    {isLogin ? "Pas de compte ? S'enregistrer" : "Déjà membre ? Se connecter"}
                </button>
            </div>
        </div>
    );
}

function ProfileModal({ user, onClose }) {
    const currentNickname = user?.user_metadata?.nickname || user?.email?.split('@')[0] || '';
    const [newNickname, setNewNickname] = useState('');
    const [role, setRole] = useState(user?.user_metadata?.role || '');
    const [bikeName, setBikeName] = useState(user?.user_metadata?.bike_name || '');
    const [password, setPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');

    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const roles = [
        "Le sage", "Le ronchonchon", "Le cuistot", "Le colosse",
        "Le sudiste", "L'artiste", "Le voyageur", "Le blagueur/historien"
    ];

    const handleAvatarUpload = async (e) => {
        try {
            setUploading(true);
            setError(null);

            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            setAvatarUrl(data.publicUrl);
        } catch (error) {
            setError("Erreur upload photo : " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            // Update metadata
            const { error: metaError } = await supabase.auth.updateUser({
                data: {
                    nickname: newNickname.trim() !== '' ? newNickname.trim() : currentNickname,
                    role: role,
                    bike_name: bikeName,
                    avatar_url: avatarUrl
                }
            });

            if (metaError) throw metaError;

            // Update password if typed
            if (password) {
                const { error: passError } = await supabase.auth.updateUser({
                    password: password
                });
                if (passError) throw passError;
            }

            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[99999999]" style={{ backgroundColor: 'rgba(0,0,0,0.98)' }} onClick={onClose}>
            <div className="w-full max-w-md bg-[#F5F3EE] rounded-[2.5rem] border-[8px] border-dark p-8 relative shadow-[25px_25px_0px_0px_#4ADE80]" onClick={e => e.stopPropagation()}>

                <button onClick={onClose} className="absolute -top-4 -right-4 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center border-4 border-dark shadow-xl hover:scale-110 transition-transform">
                    <X size={24} strokeWidth={4} />
                </button>

                <h2 className="font-sans font-black text-4xl uppercase tracking-tighter text-dark mb-6 italic">Profil Éculé</h2>

                <form onSubmit={handleSave} className="space-y-4">
                    {/* AVATAR */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative group/avatar cursor-pointer" onClick={() => !uploading && fileInputRef.current?.click()}>
                            <div className="w-24 h-24 rounded-full border-4 border-dark bg-white overflow-hidden flex items-center justify-center shadow-lg group-hover/avatar:border-accent transition-colors">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-mono text-4xl font-black text-dark/20">?</span>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-dark/50 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                <span className="text-white font-mono text-[10px] uppercase font-bold text-center px-2">
                                    {uploading ? '...' : 'Photo'}
                                </span>
                            </div>
                            <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleAvatarUpload} />
                        </div>
                    </div>

                    {/* CHAMP PSEUDO ACTUEL */}
                    <div>
                        <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Pseudo / Indicatif actuel</label>
                        <input type="text" value={currentNickname} disabled className="w-full bg-black/5 border-4 border-dark/20 text-dark/50 rounded-xl px-4 py-3 font-mono text-sm cursor-not-allowed" />
                    </div>

                    {/* NOUVEAU PSEUDO */}
                    <div>
                        <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Changer de pseudo (Optionnel)</label>
                        <input type="text" value={newNickname} onChange={e => setNewNickname(e.target.value)} placeholder="Nouveau pseudo" autoComplete="off" className="w-full bg-white border-4 border-dark rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors" />
                    </div>

                    {/* CHAMP VÉLO */}
                    <div>
                        <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Monture (Vélo)</label>
                        <input type="text" value={bikeName} onChange={e => setBikeName(e.target.value)} placeholder="Ex: Gravel Triban RC520" autoComplete="off" className="w-full bg-white border-4 border-dark rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors" />
                    </div>

                    {/* CHAMP SPÉCIALITÉ */}
                    <div>
                        <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Rôle dans l'escouade</label>
                        <div className="relative">
                            <select value={role} onChange={e => setRole(e.target.value)} className="w-full bg-white border-4 border-dark rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer pr-10">
                                <option value="">Sélectionner un rôle</option>
                                {roles.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-dark">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* CHAMP MDP */}
                    <div>
                        <label className="block font-mono text-[10px] uppercase font-bold text-dark mb-1">Mot de passe (Laisser vide si inchangé)</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nouveau mot de passe" autoComplete="new-password" className="w-full bg-white border-4 border-dark rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors" />
                    </div>

                    {error && <div className="bg-accent/10 border-2 border-accent p-3 rounded-lg font-mono text-[10px] text-accent uppercase font-bold">Erreur: {error}</div>}

                    <button type="submit" disabled={saving || uploading} className="w-full bg-dark text-[#4ADE80] py-4 rounded-xl font-sans font-black uppercase tracking-widest hover:bg-[#4ADE80] hover:text-dark border-4 border-transparent hover:border-dark transition-all disabled:opacity-50 mt-4">
                        {saving ? 'Enregistrement...' : 'Valider'}
                    </button>
                </form>
            </div>
        </div>
    );
}

function Chat({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [onlineCount, setOnlineCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [uploading, setUploading] = useState(false);
    const scrollRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user) return;

        // Charger les messages initiaux
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true })
                .limit(50);

            if (data) setMessages(data);
            if (error) console.error('Error fetching messages:', error);
        };

        fetchMessages();

        // S'abonner aux nouveaux messages
        const channel = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages((prev) => [...prev, payload.new]);
            })
            .subscribe();

        // Système de présence (pour voir qui est en ligne)
        const presenceChannel = supabase.channel('room_presence', {
            config: {
                presence: {
                    key: user.id,
                },
            },
        });

        presenceChannel
            .on('presence', { event: 'sync' }, () => {
                const newState = presenceChannel.presenceState();

                // Extraire tous les profils connectés
                const allPresences = Object.values(newState).flat();

                // Filtrer pour ne garder que les AUTRES (pas soi-même)
                const otherUsers = allPresences
                    .filter(p => p.user_id !== user.id)
                    .map(p => p.nickname || "Anonyme");

                // Supprimer les doublons s'il y en a et mettre à jour
                const uniqueOthers = [...new Set(otherUsers)];
                setOnlineUsers(uniqueOthers);
                setOnlineCount(uniqueOthers.length);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await presenceChannel.track({
                        user_id: user.id,
                        nickname: user.user_metadata?.nickname || user.email.split('@')[0],
                        online_at: new Date().toISOString(),
                    });
                }
            });

        return () => {
            supabase.removeChannel(channel);
            supabase.removeChannel(presenceChannel);
        };
    }, [user]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        setLoading(true);
        const { error } = await supabase.from('messages').insert([
            {
                content: newMessage,
                user_id: user.id,
                nickname: user.user_metadata?.nickname || user.email.split('@')[0]
            }
        ]);

        if (error) {
            console.error('Error sending message:', error);
            alert('Erreur lors de l\'envoi du message.');
        } else {
            setNewMessage('');
        }
        setLoading(false);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;

        try {
            setUploading(true);

            // 1. Créer un nom de fichier unique
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}-${new Date().getTime()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            // 2. Upload vers Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('chat-files')
                .upload(filePath, file);

            if (uploadError) {
                alert(`Erreur de stockage : ${uploadError.message}`);
                throw uploadError;
            }

            // 3. Récupérer l'URL publique
            const { data } = supabase.storage
                .from('chat-files')
                .getPublicUrl(filePath);

            const publicUrl = data.publicUrl;

            // 4. Envoyer le message avec le lien du fichier
            const { error: msgError } = await supabase.from('messages').insert([
                {
                    content: `A partagé un fichier : ${file.name}`,
                    user_id: user.id,
                    nickname: user.user_metadata?.nickname || user.email.split('@')[0],
                    file_url: publicUrl
                }
            ]);

            if (msgError) {
                alert(`Erreur base de données : ${msgError.message}`);
                throw msgError;
            }

        } catch (error) {
            console.error('Erreur upload:', error);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const renderMessageContent = (msg) => {
        if (!msg.file_url) return msg.content;

        const isImage = msg.file_url.match(/\.(jpeg|jpg|gif|png|webp)/i);
        const isVideo = msg.file_url.match(/\.(mp4|webm|ogg)/i);

        return (
            <div className="space-y-2 mt-2">
                {isImage ? (
                    <div className="relative group/media">
                        <img
                            src={msg.file_url}
                            alt="Média chat"
                            className="rounded-lg max-w-full h-auto border-2 border-white/10 hover:border-accent transition-colors"
                        />
                    </div>
                ) : isVideo ? (
                    <video controls className="rounded-lg max-w-full border-2 border-white/10">
                        <source src={msg.file_url} />
                    </video>
                ) : (
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <FileText className="text-accent" size={24} />
                        <span className="text-[10px] truncate max-w-[150px]">{msg.content.replace('A partagé un fichier : ', '')}</span>
                    </div>
                )}

                <a
                    href={msg.file_url}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="flex items-center gap-2 text-[9px] uppercase font-black text-accent hover:text-white transition-colors bg-white/5 py-1 px-2 rounded w-fit"
                >
                    <Download size={10} strokeWidth={3} />
                    Télécharger
                </a>
            </div>
        );
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[999999]">
            {/* Toggle Button */}
            {!isOpen && (
                <div className="group/presence relative">
                    {/* Tooltip List */}
                    {onlineUsers.length > 0 && (
                        <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover/presence:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover/presence:translate-y-0">
                            <div className="bg-dark border-2 border-[#4ADE80] rounded-xl p-3 shadow-xl min-w-[120px]">
                                <p className="text-[#4ADE80] font-mono text-[8px] uppercase font-black mb-2 border-b border-[#4ADE80]/20 pb-1">
                                    En selle :
                                </p>
                                <div className="space-y-1">
                                    {onlineUsers.map((name, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-[#4ADE80] rounded-full" />
                                            <span className="text-white font-mono text-[10px] uppercase font-bold">{name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative w-16 h-16 bg-dark text-[#4ADE80] rounded-full border-4 border-[#4ADE80] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:scale-110 transition-transform animate-bounce hover:animate-none"
                    >
                        <Bike size={32} strokeWidth={2.5} />

                        {/* Badge de présence */}
                        {onlineCount > 0 && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#4ADE80] text-dark rounded-full border-4 border-dark flex items-center justify-center font-mono text-xs font-black shadow-lg">
                                {onlineCount}
                            </div>
                        )}
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 md:w-96 h-[500px] bg-dark border-4 border-accent rounded-3xl shadow-[15px_15px_0px_0px_rgba(230,59,46,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-accent p-4 flex justify-between items-center border-b-4 border-dark">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <h3 className="font-mono text-[10px] md:text-xs font-black uppercase tracking-widest text-white italic">
                                Canal privé des éculés
                            </h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform">
                            <X size={20} strokeWidth={4} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 font-mono scrollbar-hide bg-[#0a0a0a]"
                    >
                        {messages.length === 0 ? (
                            <div className="text-accent/30 text-[10px] uppercase text-center mt-20 font-bold">
                                --- Transmission_En_Attente ---
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <div key={msg.id || i} className={`flex flex-col ${msg.user_id === user.id ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black uppercase text-accent">{msg.nickname}</span>
                                        <span className="text-[8px] text-white/20 uppercase">[{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                                    </div>
                                    <div className={`px-3 py-2 rounded-xl text-xs max-w-[85%] border-2 ${msg.user_id === user.id
                                        ? 'bg-accent/10 border-accent text-white rounded-tr-none'
                                        : 'bg-white/5 border-white/20 text-white/90 rounded-tl-none'
                                        }`}>
                                        {renderMessageContent(msg)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-dark border-t-4 border-accent/20 flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept="image/*,video/*,.pdf,.doc,.docx"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all ${uploading ? 'bg-white/5 border-white/10 animate-pulse' : 'bg-white/5 border-white/10 text-white/40 hover:border-accent hover:text-accent'
                                    }`}
                            >
                                {uploading ? <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" /> : <Paperclip size={18} />}
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={uploading ? "Chargement du fichier..." : "Un message pour l'équipage ?"}
                                disabled={uploading}
                                className="flex-1 bg-white/5 border-2 border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={loading || uploading || !newMessage.trim()}
                                className="w-10 h-10 bg-accent text-white rounded-lg flex items-center justify-center hover:bg-white hover:text-accent transition-all disabled:opacity-30"
                            >
                                <Send size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

function RoutePopup({ onClose }) {
    const popupRef = useRef(null);

    const stops = [
        { x: 100, y: 200, name: "Bordeaux", desc: "Start" },
        { x: 260, y: 130, name: "Arcachon", desc: "La Dune" },
        { x: 420, y: 250, name: "Mimizan", desc: "Landes" },
        { x: 580, y: 140, name: "Hendaye", desc: "Border" },
        { x: 720, y: 230, name: "San Sebastián", desc: "Goal", final: true }
    ];

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4 md:p-6"
            style={{ zIndex: 9999999, backgroundColor: 'rgba(0,0,0,0.96)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={onClose}
        >
            <div
                ref={popupRef}
                className="w-full max-w-4xl rounded-[2.5rem] border-[8px] border-[#111111] p-6 md:p-10 relative shadow-[25px_25px_0px_0px_#E63B2E] my-auto overflow-hidden bg-[#F5F3EE]"
                style={{ opacity: 1, display: 'flex', flexDirection: 'column' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-12 h-12 bg-[#E63B2E] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform z-[1000] border-[3px] border-[#111111]"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b-[6px] border-[#111111] pb-4">
                    <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter text-[#111111] italic">ROADBOOK</h2>
                    <div className="bg-[#111111] text-[#E63B2E] px-4 py-1 font-mono font-bold text-sm uppercase tracking-widest border-[3px] border-[#E63B2E]">
                        MISSION_26
                    </div>
                </div>

                {/* Map Display */}
                <div className="relative w-full bg-white rounded-3xl border-[6px] border-[#111111] p-4 md:p-8 mb-8 overflow-visible">
                    <svg viewBox="0 0 800 350" className="w-full h-auto overflow-visible" style={{ minHeight: '220px' }}>
                        <path
                            d="M 100 200 C 150 110, 200 110, 260 130 S 350 280, 420 250 S 520 110, 580 140 S 650 260, 720 230"
                            fill="none"
                            stroke="#E63B2E"
                            strokeWidth="24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {stops.map((stop, i) => (
                            <g key={i}>
                                <circle cx={stop.x} cy={stop.y} r="22" fill="#111111" />
                                <circle cx={stop.x} cy={stop.y} r="10" fill={stop.final ? "#E63B2E" : "#F5F3EE"} />

                                <text
                                    x={stop.x}
                                    y={stop.y + 55}
                                    textAnchor="middle"
                                    fill="#111111"
                                    style={{
                                        fontFamily: '"Space Grotesk", sans-serif',
                                        fontWeight: 900,
                                        fontSize: '20px',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {stop.name}
                                </text>
                                <text
                                    x={stop.x}
                                    y={stop.y + 75}
                                    textAnchor="middle"
                                    fill="#E63B2E"
                                    style={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {stop.desc}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                    {[
                        { l: "DIST.", v: "240KM" },
                        { l: "ELEV.", v: "+1200M" },
                        { l: "SURF.", v: "ASPHALTE" },
                        { l: "ETAT", v: "PRÊT" }
                    ].map((s, i) => (
                        <div key={i} className="bg-[#111111] p-3 border-l-4 border-[#E63B2E]">
                            <p className="text-[#E63B2E] font-mono text-[10px] font-bold uppercase">{s.l}</p>
                            <p className="text-white font-sans font-black text-lg uppercase">{s.v}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function HeroAccordion({ onOpenRoute }) {
    const [activeId, setActiveId] = useState(2026);

    const trips = Array.from({ length: 11 }, (_, i) => {
        const year = 2017 + i;
        const gradients = [
            "from-[#FF5E5B] to-[#FF8A88]", "from-[#FFB52E] to-[#FFD57F]", "from-[#4ADE80] to-[#86E8A8]",
            "from-[#38BDF8] to-[#83D6FB]", "from-[#A855F7] to-[#C98CF9]", "from-[#F472B6] to-[#F8A4D1]",
            "from-[#14B8A6] to-[#5EEAD9]", "from-[#F59E0B] to-[#FBCF74]", "from-[#8B5CF6] to-[#B393F8]",
            "from-[#111111] to-[#333333]", "from-[#E63B2E] to-[#9B2117]"
        ];
        return {
            id: year,
            year: year,
            title: year === 2026 ? "MISSION 26" : `Trip ${year}`,
            bg: year === 2026
                ? "url('https://images.unsplash.com/photo-1619337491481-de0b69b2050d?q=80&w=2535&auto=format&fit=crop')"
                : year === 2025
                    ? "url('https://images.unsplash.com/photo-1592900086621-4cd9d2ecb7ac?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                    : year === 2024
                        ? "url('https://images.unsplash.com/photo-1746253077622-a5ef69c43b6d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                        : year === 2023
                            ? "url('https://images.unsplash.com/photo-1596436831831-87dd84a69101?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                            : null,
            gradient: gradients[i]
        };
    });

    return (
        <section className="w-full h-[100dvh] flex flex-col md:flex-row bg-dark" id="hero">
            {trips.map((trip) => {
                const isActive = activeId === trip.id;

                return (
                    <div
                        key={trip.id}
                        onClick={() => setActiveId(trip.id)}
                        className={`
                            relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0
                            border-b-[3px] md:border-b-0 md:border-r-[3px] border-dark
                            overflow-hidden group
                            ${isActive ? 'flex-[10] md:flex-[10]' : 'flex-[1] md:flex-[1] min-h-[40px] md:min-w-[45px] hover:flex-[1.5] md:hover:flex-[1.5]'}
                        `}
                    >
                        {/* BACKGROUND */}
                        <div
                            className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100 group-hover:scale-105'}`}
                            style={trip.bg ? { backgroundImage: trip.bg } : {}}
                        />
                        {!trip.bg && (
                            <div className={`absolute inset-0 bg-gradient-to-br ${trip.gradient} opacity-90`} />
                        )}
                        {/* Overlay to dim inactive */}
                        <div className={`absolute inset-0 bg-dark transition-opacity duration-700 ${isActive ? 'opacity-30 md:opacity-20' : 'opacity-60 group-hover:opacity-40'}`} />

                        {/* CONTENT CONTAINER */}
                        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">

                            {/* VERTICAL / HORIZONTAL TITLE (When Inactive) */}
                            <div className={`
                                absolute inset-0 flex items-center justify-center
                                transition-opacity duration-500
                                ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                            `}>
                                <span className="text-white font-sans font-black text-lg md:text-2xl uppercase tracking-widest whitespace-nowrap md:-rotate-90 origin-center drop-shadow-md">
                                    {trip.year}
                                </span>
                            </div>

                            {/* ACTIVE CONTENT */}
                            <div className={`
                                flex flex-col justify-end h-full w-full max-w-4xl
                                transition-all duration-700 delay-100
                                ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
                            `}>
                                {isActive && (
                                    <>
                                        {trip.id === 2026 ? (
                                            <div className="text-primary z-10 mb-8 md:mb-16">
                                                <h1 className="flex flex-col gap-1 md:gap-2 relative">
                                                    <span className="font-sans font-extrabold pb-2 text-3xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-none drop-shadow-lg">
                                                        Conquérir la
                                                    </span>
                                                    <span className="font-serif italic text-[3.5rem] md:text-[7rem] lg:text-[9rem] leading-none mb-4 md:mb-6 text-primary flex items-end gap-2 md:gap-6 drop-shadow-lg">
                                                        <span className="hidden md:block h-[2px] w-24 bg-accent mb-[2rem] md:mb-[3rem]"></span>
                                                        Distance.
                                                    </span>
                                                </h1>
                                                <p className="mt-2 md:mt-6 text-primary/90 font-mono text-[10px] md:text-lg max-w-lg mb-6 md:mb-10 border-l-2 border-accent pl-4 drop-shadow-md bg-dark/20 p-2 md:bg-transparent md:p-0 rounded">
                                                    De Bordeaux à San Sébastien : la précision brute d'un effort collectif. Notre trip 2026.
                                                </p>
                                                <button onClick={(e) => { e.stopPropagation(); onOpenRoute(); }} className="btn-magnetic bg-accent text-white px-5 py-3 md:px-8 md:py-4 rounded-full font-sans font-bold text-xs md:text-lg inline-flex items-center gap-3 hover:scale-105 transition-transform w-fit border-2 border-transparent hover:border-white shadow-xl">
                                                    Explorer l'Itinéraire
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-white z-10 mb-8 md:mb-16">
                                                <h2 className="font-sans font-black text-5xl md:text-8xl lg:text-[9rem] uppercase tracking-tighter italic mb-4 drop-shadow-xl">
                                                    {trip.title}
                                                </h2>
                                                <div className="bg-dark/80 backdrop-blur-sm text-white px-4 py-2 font-mono font-bold text-xs md:text-sm uppercase tracking-widest border-[3px] border-white inline-block shadow-lg">
                                                    ARCHIVE CLASSIFIÉE
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

function DiagnosticShuffler() {
    const [cards, setCards] = useState([
        { id: 1, stop: "Bordeaux", desc: "Coordonnées de départ : La belle endormie s'éveille." },
        { id: 2, stop: "Les Landes", desc: "Le désert de pins : Vitesse et endurance linéaire." },
        { id: 3, stop: "San Sébastien", desc: "L'arrivée : La récompense basque. Système désactivé." }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newCards = [...prev];
                const last = newCards.pop();
                newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-64 w-full flex items-center justify-center">
            {cards.map((card, index) => {
                const isActive = index === 0;
                const opacity = isActive ? 1 : Math.max(0, 1 - (index * 0.4));
                const yOffset = index * 24;
                const scale = 1 - (index * 0.06);
                const zIndex = 30 - index;
                return (
                    <div
                        key={card.id}
                        className="absolute right-0 left-0 mx-auto w-full p-6 bg-background rounded-[2rem] border-2 border-dark shadow-2xl transition-all duration-[800ms]"
                        style={{
                            transform: `translateY(${yOffset}px) scale(${scale})`,
                            opacity,
                            zIndex,
                            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        <h4 className="font-sans font-bold text-xl uppercase tracking-widest">{card.stop}</h4>
                        <p className="font-mono text-sm text-dark/80 mt-2">{card.desc}</p>
                    </div>
                );
            })}
        </div>
    );
}

function TelemetryTypewriter() {
    const messages = [
        "INITIALISATION...",
        "DATE DE DÉPART : MAI 2026",
        "POINTEUR : BORDEAUX V.R",
        "OBJECTIF : SAN SÉBASTIEN",
        "MÉTÉO PRÉVUE : INCERTAINE",
        "PUISSANCE : MAXIMALE"
    ];
    const [text, setText] = useState("");
    const [msgIdx, setMsgIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);

    useEffect(() => {
        if (msgIdx >= messages.length) {
            setMsgIdx(0);
            return;
        }

        if (charIdx < messages[msgIdx].length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + messages[msgIdx][charIdx]);
                setCharIdx(c => c + 1);
            }, 40);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCharIdx(0);
                setMsgIdx(m => m + 1);
                setText("");
            }, 2500);
            return () => clearTimeout(timeout);
        }
    }, [charIdx, msgIdx, messages.length]);

    return (
        <div className="w-full bg-dark text-primary p-6 rounded-[2rem] h-64 flex flex-col justify-between font-mono shadow-2xl relative overflow-hidden border-2 border-transparent">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                <span className="text-xs tracking-widest text-accent font-bold uppercase">Flux en direct</span>
            </div>
            <div className="mt-6 flex-1 text-sm uppercase leading-relaxed text-primary/80">
                <span className="text-primary font-bold">{'>'} {text}</span>
                <span className="animate-ping inline-block w-2 ml-1 h-4 bg-accent align-middle relative top-[-1px]"></span>
            </div>
        </div>
    );
}

function CursorProtocolScheduler() {
    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const [activeDay, setActiveDay] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
            tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 })
                .to(cursorRef.current, { opacity: 1, duration: 0.2 })
                .to(cursorRef.current, { x: 60, y: 70, duration: 1, ease: 'power2.inOut' })
                .to(cursorRef.current, { scale: 0.9, duration: 0.1, onComplete: () => setActiveDay(3) })
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                .to(cursorRef.current, { x: 180, y: 110, duration: 1, ease: 'power2.inOut', delay: 0.5 })
                .to(cursorRef.current, { scale: 0.9, duration: 0.1, onComplete: () => setActiveDay(9) })
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5, onComplete: () => setActiveDay(null) });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-64 bg-background border-2 border-dark p-6 rounded-[2rem] relative flex flex-col shadow-2xl overflow-hidden">
            <h4 className="font-sans font-bold text-xl text-dark mb-4 uppercase tracking-widest">Escouade</h4>
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs flex-1">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                    <div key={day} className="text-dark/40 font-bold mb-2">{day}</div>
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                    <div
                        key={i}
                        className={`flex items-center justify-center rounded-lg border-2 transition-colors duration-300 font-bold ${activeDay === i ? 'bg-accent text-white border-accent' : 'border-transparent text-dark/80 bg-dark/5'}`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <svg ref={cursorRef} className="absolute left-6 top-8 w-7 h-7 z-10 drop-shadow-lg text-dark z-50 pointer-events-none transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path fill="currentColor" d="M11.96 0L24 24L11.96 16.66L0 24L11.96 0Z" stroke="white" strokeWidth="1.5" />
            </svg>
        </div>
    );
}

function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-16 max-w-7xl mx-auto w-full bg-background" id="features">
            <h2 className="text-sm font-mono tracking-widest uppercase mb-16 text-accent flex items-center gap-4 font-bold">
                <span className="w-16 h-[2px] bg-accent"></span>
                Paramètres de mission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
                <div className="feature-card flex flex-col gap-8">
                    <DiagnosticShuffler />
                    <div>
                        <h3 className="font-sans font-extrabold text-3xl text-dark uppercase tracking-tight mb-2">L'Itinéraire</h3>
                        <p className="font-mono text-sm text-dark/70">Projection géographique des étapes. Cap au sud-ouest vers la frontière.</p>
                    </div>
                </div>
                <div className="feature-card flex flex-col gap-8 md:translate-y-16">
                    <TelemetryTypewriter />
                    <div>
                        <h3 className="font-sans font-extrabold text-3xl text-dark uppercase tracking-tight mb-2">Les Dates</h3>
                        <p className="font-mono text-sm text-dark/70">Logistique temporelle. Mai 2026. La fenêtre de tir est confirmée.</p>
                    </div>
                </div>
                <div className="feature-card flex flex-col gap-8">
                    <CursorProtocolScheduler />
                    <div>
                        <h3 className="font-sans font-extrabold text-3xl text-dark uppercase tracking-tight mb-2">L'Équipage</h3>
                        <p className="font-mono text-sm text-dark/70">Les éculés. Force de frappe coordonnée. 100% énergie cinétique.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Philosophy() {
    const comp = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.philo-statement-sub', {
                scrollTrigger: { trigger: comp.current, start: 'top 70%' },
                opacity: 0,
                y: 30,
                duration: 1.2,
                ease: 'power3.out'
            });
            gsap.from('.philo-statement-main .word', {
                scrollTrigger: { trigger: comp.current, start: 'top 60%' },
                opacity: 0,
                y: 40,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.15,
                delay: 0.2
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="relative w-full py-48 px-6 md:px-16 overflow-hidden flex flex-col justify-center items-center text-center md:text-left md:items-start" id="philosophie">
            <img src="https://images.unsplash.com/photo-1632248812630-1281b9f5c118?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 w-full h-full object-cover -z-20 transform scale-105" alt="Ocean waves" />
            <div className="absolute inset-0 bg-dark/60 -z-10"></div>

            <div className="max-w-5xl z-10">
                <h3 className="philo-statement-sub font-mono text-lg md:text-xl text-primary/60 mb-10 max-w-2xl leading-relaxed">
                    La plupart des voyages se concentrent sur : le confort, l'absence de friction, le repos passif.
                </h3>
                <h2 className="philo-statement-main font-serif italic text-6xl md:text-8xl lg:text-[8rem] leading-[1.1] text-primary">
                    <span className="block word">Nous nous</span>
                    <span className="block word">concentrons sur :</span>
                    <span className="block mt-4 word text-accent not-italic font-sans font-extrabold uppercase tracking-tighter underline decoration-8 underline-offset-8">L'effort.</span>
                </h2>
            </div>
        </section>
    );
}

function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, i) => {
                if (i < cards.length - 1) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top top',
                        endTrigger: '.protocol-end',
                        end: 'bottom bottom',
                        pin: true,
                        pinSpacing: false,
                    });

                    gsap.to(card, {
                        scale: 0.92,
                        opacity: 0.4,
                        filter: 'blur(10px)',
                        scrollTrigger: {
                            trigger: cards[i + 1],
                            start: 'top bottom',
                            end: 'top top',
                            scrub: true,
                        }
                    });
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const steps = [
        {
            num: "01",
            title: "Préparation",
            desc: "Analyse des itinéraires. Optimisation du matériel. Conditionnement mental."
        },
        {
            num: "02",
            title: "L'Étape",
            desc: "Exécution du plan. Combattre le vent, avaler l'asphalte, ignorer la douleur."
        },
        {
            num: "03",
            title: "Célébration",
            desc: "San Sébastien. Désactivation des protocoles d'effort. Récupération Basque."
        }
    ];

    return (
        <div ref={containerRef} className="bg-background relative" id="protocole">
            {steps.map((step, idx) => (
                <section key={idx} className="protocol-card h-[100dvh] w-full flex flex-col md:flex-row items-center justify-center p-6 md:p-16 border-b-2 border-dark/5 bg-background text-dark relative shadow-2xl z-20 overflow-hidden">
                    <div className="absolute top-8 left-6 md:top-12 md:left-16 font-mono text-2xl tracking-widest opacity-20 font-bold uppercase z-0">
                        Phase_{step.num}
                    </div>
                    <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 md:gap-24 items-center z-10 relative">
                        <div className="w-48 h-48 md:w-80 md:h-80 flex-shrink-0 text-accent relative flex items-center justify-center">
                            {idx === 0 && (
                                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="50" cy="50" r="45" strokeDasharray="4 8" />
                                    <circle cx="50" cy="50" r="30" strokeDasharray="10 5" className="animate-[spin_10s_linear_infinite_reverse]" origin="50 50" />
                                    <path d="M50 5 L50 95 M5 50 L95 50" opacity="0.3" />
                                </svg>
                            )}
                            {idx === 1 && (
                                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
                                    <g className="animate-pulse">
                                        <path d="M10 50 Q 25 10, 50 50 T 90 50" strokeDasharray="200" strokeDashoffset="0" />
                                        <path d="M10 50 Q 25 90, 50 50 T 90 50" opacity="0.4" />
                                    </g>
                                    <circle cx="50" cy="50" r="4" fill="currentColor" />
                                </svg>
                            )}
                            {idx === 2 && (
                                <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
                                    <polygon points="50,15 61,35 85,38 68,54 72,75 50,65 28,75 32,54 15,38 39,35" className="animate-[pulse_4s_ease-in-out_infinite] origin-center" opacity="0.8" />
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" className="animate-[spin_30s_linear_infinite]" origin="50 50" />
                                </svg>
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="font-sans font-black uppercase text-5xl md:text-7xl lg:text-[7rem] mb-6 tracking-tighter leading-none">{step.title}</h2>
                            <p className="font-mono text-dark/70 text-lg md:text-2xl max-w-xl border-l-4 border-accent pl-6">{step.desc}</p>
                        </div>
                    </div>
                </section>
            ))}
            <div className="protocol-end h-px w-full"></div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="text-primary pt-32 pb-16 px-6 md:px-16 rounded-t-[4rem] flex flex-col items-center text-center relative z-50 overflow-hidden mt-[-2rem]">
            <img src="https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 w-full h-full object-cover -z-20 scale-105" alt="Night landscape" />
            <div className="absolute inset-0 bg-dark/80 -z-10"></div>
            <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start gap-12 text-left mb-24 z-10">
                <div>
                    <h2 className="font-sans font-extrabold text-4xl mb-3 tracking-tighter uppercase">Les Éculés</h2>
                    <p className="font-mono text-sm text-primary/60 border-l-2 border-accent pl-4">Notre trip 2026. Bordeaux - San Sébastien.</p>
                </div>
                <div className="flex gap-16 font-mono text-sm uppercase font-bold tracking-widest">
                    <div className="flex flex-col gap-6">
                        <a href="#features" className="hover:text-accent transition-colors">Itinéraire</a>
                        <a href="#features" className="hover:text-accent transition-colors">Dates</a>
                    </div>
                    <div className="flex flex-col gap-6">
                        <a href="#features" className="hover:text-accent transition-colors">Équipage</a>
                        <a href="#protocole" className="hover:text-accent transition-colors">Protocole</a>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-6xl border-t-2 border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-xs gap-6 z-10">
                <span className="text-primary/40 font-bold tracking-widest uppercase align-middle">© 2026 Les Éculés</span>
            </div>
        </footer>
    );
}

function App() {
    const [isRouteOpen, setIsRouteOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtenir la session initiale
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Écouter les changements d'état
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <>
            <svg className="noise-overlay" style={{ display: 'none' }}>
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                </filter>
            </svg>
            <div className="noise-overlay" style={{ filter: 'url(#noiseFilter)', display: 'block' }}></div>

            <Navbar user={user} onJoinClick={() => setIsAuthModalOpen(true)} onProfileClick={() => setIsProfileOpen(true)} />
            <HeroAccordion onOpenRoute={() => setIsRouteOpen(true)} />
            <Features />
            <Philosophy />
            <Protocol />
            <Footer />

            <Chat user={user} />

            {isRouteOpen && <RoutePopup onClose={() => setIsRouteOpen(false)} />}
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
            {isProfileOpen && user && <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} />}
        </>
    );
}

export default App;
