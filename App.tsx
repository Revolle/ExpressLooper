import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { Slider } from './components/Slider';
import { DeviceSelector } from './components/DeviceSelector';
import { Bargraph } from './components/Bargraph';
import { Button } from './components/Button';
import { NumberInput } from './components/NumberInput';
import { FilePicker } from './components/FilePicker';
import { Mic, Video, Volume2, Save, Play, RefreshCw, Layers, Hash } from './components/Icons';

const STORAGE_KEY = 'audioVideoLooperState';

interface AppState {
    videoFileName: string;
    selectedMic: string;
    selectedOutput: string;
    micVolume: number;
    micDelay: number;
    audioVolume: number;
    loopVolume: number;
    numLoops: number;
    numTaps: number;
}

const DEFAULTS: AppState = {
    videoFileName: '',
    selectedMic: '',
    selectedOutput: '',
    micVolume: 75,
    micDelay: 20,
    audioVolume: 80,
    loopVolume: 90,
    numLoops: 1,
    numTaps: 0,
};

const getInitialState = (): AppState => {
    try {
        const savedStateJSON = localStorage.getItem(STORAGE_KEY);
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);
            return { ...DEFAULTS, ...savedState };
        }
    } catch (error) {
        console.error("Failed to load state from localStorage:", error);
    }
    return DEFAULTS;
};

const App: React.FC = () => {
    const [state, setState] = useState<AppState>(getInitialState);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [micDevices, setMicDevices] = useState<MediaDeviceInfo[]>([]);
    const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[]>([]);
    const [micLevel, setMicLevel] = useState(0);

    useEffect(() => {
        const getDevices = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = devices.filter(device => device.kind === 'audioinput');
                const audioOutputs = devices.filter(device => device.kind === 'audiooutput');
                setMicDevices(audioInputs);
                setAudioOutputDevices(audioOutputs);
                
                // Set default devices if not already set from saved state
                setState(s => ({
                    ...s,
                    selectedMic: s.selectedMic || (audioInputs[0]?.deviceId || ''),
                    selectedOutput: s.selectedOutput || (audioOutputs[0]?.deviceId || ''),
                }));
            } catch (err) {
                console.error("Error enumerating devices:", err);
            }
        };

        getDevices();
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error("Failed to save state to localStorage:", error);
        }
    }, [state]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMicLevel(Math.random() * 100);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleFileChange = (file: File | null) => {
        setVideoFile(file);
        setState(prevState => {
            const newState = { ...prevState, videoFileName: file ? file.name : '' };
            if (file) {
                const loopsMatch = file.name.match(/NbLoop(\d+)/i);
                const tapsMatch = file.name.match(/Tap(\d+)/i);
                newState.numLoops = loopsMatch?.[1] ? Math.min(10, Math.max(0, parseInt(loopsMatch[1], 10))) : DEFAULTS.numLoops;
                newState.numTaps = tapsMatch?.[1] ? Math.min(16, Math.max(0, parseInt(tapsMatch[1], 10))) : DEFAULTS.numTaps;
            } else {
                newState.numLoops = DEFAULTS.numLoops;
                newState.numTaps = DEFAULTS.numTaps;
            }
            return newState;
        });
    };

    const handleMicSelect = (deviceId: string) => {
        setState(s => ({ ...s, selectedMic: deviceId }));
        console.log(`Simulating BASS_RecordSetDevice for device ID: ${deviceId}`);
        console.log("Simulating BASS_RecordStart() for fake recording...");
    };

    const handleOutputSelect = (deviceId: string) => {
        setState(s => ({ ...s, selectedOutput: deviceId }));
        console.log(`Simulating BASS_SetDevice for device ID: ${deviceId}`);
    };

    const handleStartLooper = () => {
        if (!state.videoFileName) {
            alert("Please select a video file first.");
            return;
        }
        if (!videoFile) {
            alert(`Please re-select your video file: ${state.videoFileName}`);
            return;
        }
        console.log(`Starting looper with video: ${videoFile.name}`);
        console.log("Simulating video playback in landscape and BASS_RecordStart()...");
    };

    const handleSaveLoops = () => {
        if (!state.videoFileName) {
            alert("No video file selected to derive the name from.");
            return;
        }
        const newFileName = `wav_${state.videoFileName.replace(/\.[^/.]+$/, "")}.wav`;
        console.log(`Saving mixer output to ${newFileName}`);
        console.log("Simulating saving data from BASS_ChannelGetData()...");
        alert(`Loops saved as ${newFileName}`);
    };

    const handleMeasureDelay = () => {
        console.log("Starting MeasureDelay() function...");
        alert("Simulating microphone delay measurement.");
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Audio Video Looper</h1>
                <p className="mt-2 text-lg text-gray-400">Advanced Mixing Control Panel</p>
            </header>
            
            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <Card title="Video Source" icon={<Video />}>
                            <FilePicker onFileChange={handleFileChange} />
                            {state.videoFileName && <p className="mt-4 text-sm text-gray-300">Selected: <span className="font-medium text-cyan-400">{state.videoFileName}</span></p>}
                        </Card>
                        
                        <Card title="Microphone Input" icon={<Mic />}>
                            <DeviceSelector label="Select Microphone" devices={micDevices} selectedDevice={state.selectedMic} onSelectDevice={handleMicSelect} />
                            <Slider label="Mic Volume" value={state.micVolume} onChange={e => { const v = Number(e.target.value); setState(s => ({...s, micVolume: v})); console.log(`Simulating BASS_RecordSetInput(${v})`); }} />
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Mic Level</label>
                                <Bargraph value={micLevel} />
                            </div>
                            <Slider label="Delay Mic => Output" value={state.micDelay} onChange={e => { const v = Number(e.target.value); setState(s => ({...s, micDelay: v})); console.log(`Simulating BASS_Mixer_StreamAddChannelEx() with delay ${v}`); }} />
                            <div className="mt-4">
                               <Button onClick={handleMeasureDelay} icon={<RefreshCw />}>Measure Mic Delay</Button>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card title="Audio Output" icon={<Volume2 />}>
                            <DeviceSelector label="Select Audio Output" devices={audioOutputDevices} selectedDevice={state.selectedOutput} onSelectDevice={handleOutputSelect} />
                            <Slider label="Audio Volume" value={state.audioVolume} onChange={e => { const v = Number(e.target.value); setState(s => ({...s, audioVolume: v})); console.log(`Simulating BASS_SetVolume(${v})`); }} />
                            <Slider label="Loop Volume" value={state.loopVolume} onChange={e => setState(s => ({...s, loopVolume: Number(e.target.value)}))} />
                        </Card>

                        <Card title="Loop Configuration" icon={<Layers />}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <NumberInput 
                                    label="Number of Loops" 
                                    value={state.numLoops} 
                                    onChange={v => setState(s => ({...s, numLoops: v}))} 
                                    min={0} 
                                    max={10} 
                                    icon={<Layers />}
                                />
                                <NumberInput 
                                    label="Number of Taps" 
                                    value={state.numTaps} 
                                    onChange={v => setState(s => ({...s, numTaps: v}))} 
                                    min={0} 
                                    max={16} 
                                    icon={<Hash />}
                                />
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={handleStartLooper} variant="primary" size="lg" icon={<Play />}>Start Looper</Button>
                    <Button onClick={handleSaveLoops} variant="secondary" size="lg" icon={<Save />}>Save Loops</Button>
                </div>
            </main>
        </div>
    );
};

export default App;
